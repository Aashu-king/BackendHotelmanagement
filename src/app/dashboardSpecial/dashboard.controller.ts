import { Request, Response } from "express";
import dashboardService from "./dashboard.service";
import moment from "moment";
import BillDetail from "../../database/models/billdetail.model";
import sequelize from "../../database/models";
import { Op } from "sequelize";
import { Payments } from "../../database/models/payment.model";
import User from "../../database/models/user.model";
import Bill from "../../database/models/bills.model";
import { Orders } from "../../database/models/orders.models";
import { Reservation } from "../../database/models/reservation.model";

class DashboardController {
    async RoomAvailable(req: Request, res: Response) {
        try {
            const { theDate } = req.query;

            if (!theDate) {
                return res.status(400).json({
                    message: "Date parameter is missing. Please provide a valid date.",
                });
            }

            console.log("🚀 ~ RoomAvailableController ~ Checking availability for date:", theDate);

            const theDataWeGot = await dashboardService.RoomAvailable(theDate);

            if (theDataWeGot) {
                return res.status(200).json(theDataWeGot);
            } else {
                return res.status(201).json({
                    message: `No reservations found on the provided date: ${theDate}`,
                });
            }

        } catch (error) {
            console.error("🚀 ~ RoomAvailableController ~ Error occurred:", error);

            // Send a generic error response to the client
            return res.status(500).json({
                message: "An internal server error occurred while checking room availability.",
            });
        }
    }

    async GuestData(req: Request, res: Response) {
        try {
            const { firstName, lastName } = req.query
            const theDataWeGot = await dashboardService.gusestData(firstName, lastName);

            if (theDataWeGot) {
                return res.status(200).json(theDataWeGot);
            } else {
                return res.status(201).json({
                    message: `No reservations found on the provided date: `,
                });
            }
        } catch (error) {
            console.log("🚀 ~ DashboardController ~ GuestData ~ error:", error)

        }
    }

    async graphData(req: Request, res: Response) {
        try {
            const currentYear = moment().year();

            const billCollection = await BillDetail.findAll({
                attributes: [
                    [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m'), 'month'],
                    [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
                ],
                where: {
                    createdAt: {
                        [Op.gte]: moment().startOf('year').toDate(),
                        [Op.lt]: moment().endOf('year').toDate()
                    }
                },
                group: ['month'],
                order: [['month', 'ASC']]
            });

            const restaurantCollection = await Payments.findAll({
                attributes: [
                    [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%Y-%m'), 'month'],
                    [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
                ],
                where: {
                    created_at: {
                        [Op.gte]: moment().startOf('year').toDate(),
                        [Op.lt]: moment().endOf('year').toDate()
                    }
                },
                group: ['month'],
                order: [['month', 'ASC']]
            });

            // Fetch all users created this year with their creation date and salary
            const users = await User.findAll({
                attributes: ['createdAt', 'salary'],
                where: {
                    createdAt: {
                        [Op.lt]: moment().endOf('year').toDate()
                    }
                },
                order: [['createdAt', 'ASC']]
            });

            const monthlyData = new Map();

            const addToMonthlyData = (data, key) => {
                data.forEach(item => {
                    const month = moment(item.getDataValue('month')).format('YYYY-MM');
                    const amount = parseFloat(item.getDataValue('totalAmount')) || 0;

                    if (!monthlyData.has(month)) {
                        monthlyData.set(month, { billCollection: 0, restaurantCollection: 0, userSalary: 0, userCount: 0 });
                    }

                    monthlyData.get(month)[key] += amount;
                });
            };

            addToMonthlyData(billCollection, 'billCollection');
            addToMonthlyData(restaurantCollection, 'restaurantCollection');

            let cumulativeUserCount = 0;
            let cumulativeSalary = 0;
            const months = Array.from({ length: 12 }, (_, i) => moment().month(i).format('YYYY-MM'));

            months.forEach(month => {
                if (!monthlyData.has(month)) {
                    monthlyData.set(month, { billCollection: 0, restaurantCollection: 0, userSalary: 0, userCount: 0 });
                }

                const monthEnd = moment(month, 'YYYY-MM').endOf('month');
                const newUsers = users.filter(user => moment(user.createdAt).isSameOrBefore(monthEnd));

                cumulativeUserCount += newUsers.length;
                cumulativeSalary = newUsers.reduce((sum, user: any) => {
                    console.log(`Current sum: ${sum}, Salary: ${user.dataValues.salary}`);
                    return sum + user.dataValues.salary; 
                }, 0);
                const total = 60000 + 100000
                console.log("🚀 ~ DashboardController ~ graphData ~ total:", total)
                console.log("🚀 ~ DashboardController ~ cumulativeSalary+=newUsers.reduce ~ cumulativeSalary:", cumulativeSalary)
                
                // console.log("🚀 ~ DashboardController ~ graphData ~ newUsers:", newUsers)
                let justChecking = newUsers.reduce((sum, user: any) => {
                    console.log(`User Salary: ${user.dataValues.salary}`);
                    return sum + user.salary;
                }, 0);
                const monthData = monthlyData.get(month);
                monthData.userCount = cumulativeUserCount;
                monthData.userSalary = cumulativeSalary;
                // console.log("🚀 ~ DashboardController ~ graphData ~ userSalary:", monthData.userSalary)
            });

            const formattedData = Array.from(monthlyData, ([month, data]) => {
                const totalRevenue = data.billCollection + data.restaurantCollection;
                const totalExpenses = data.userSalary;
                const profit = totalRevenue - totalExpenses;

                return {
                    month: moment(month, 'YYYY-MM').format('MMMM YYYY'),
                    billCollection: data.billCollection,
                    restaurantCollection: data.restaurantCollection,
                    totalRevenue,
                    userCount: data.userCount,
                    userSalary: totalExpenses,
                    profit
                };
            });

            formattedData.sort((a, b) => moment(a.month, 'MMMM YYYY').diff(moment(b.month, 'MMMM YYYY')));

            const chartData = {
                labels: [],
                datasets: [
                    { data: [], label: 'Total Revenue' },
                    { data: [], label: 'Total Expenses' },
                    { data: [], label: 'Profit' }
                ]
            };

            formattedData.forEach(item => {
                chartData.labels.push(item.month);
                chartData.datasets[0].data.push(item.totalRevenue);
                chartData.datasets[1].data.push(item.userSalary);
                chartData.datasets[2].data.push(item.profit);
            });

            res.status(200).json({
                barChartData: chartData
            });

        } catch (error) {
            console.log("🚀 ~ DashboardController ~ graphData ~ error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async outletwiseCollectionData(req: Request, res: Response) {
        try {
            const billData = await Bill.findAll({
                include: [{
                    model: BillDetail,
                    attributes: []
                }],
                attributes: [
                    'outletid',
                    [sequelize.fn('SUM', sequelize.col('billDetails.amount')), 'paidamount']
                ],
                group: ['Bill.outletid'],
                raw: true
            });
            //  include: [{ model: Payments, attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'paidamount']] }],
            const paymentData = await Orders.findAll({
                include: [{ model: Payments, attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'paidamount']] }],
                attributes: ['outletid',], group: ['Orders.outletid'], raw: true
            });
            console.log("🚀 ~ DashboardController ~ outletwiseCollectionData ~ paymentData:", paymentData)

            const outletMap = new Map<number, number>();

            billData.forEach((bill: any) => {
                const outletid = bill.outletid;
                console.log("🚀 ~ DashboardController ~ outletwiseCollectionData ~ bill:", bill)
                const amount = parseFloat(bill.paidamount || '0');
                outletMap.set(outletid, (outletMap.get(outletid) || 0) + amount);
            });

            paymentData.forEach((payment: any) => {
                const outletid = payment.outletid;
                console.log("🚀 ~ DashboardController ~ outletwiseCollectionData ~ payment:", payment['payment.paidamount'])
                const amount = parseFloat(payment['payment.paidamount'] || '0');
                console.log("🚀 ~ DashboardController ~ paymentData.forEach ~ amount:", amount)
                outletMap.set(outletid, (outletMap.get(outletid) || 0) + amount);
            });
            console.log("🚀 ~ DashboardController ~ outletwiseCollectionData ~ outletMap:", outletMap)

            const processedData: any[] = Array.from(outletMap, ([outletid, amount]) => ({ outletid, amount }));

            const labels = processedData.map(data => `Outlet ${data.outletid}`);
            const data = processedData.map(data => data.amount);

            const backgroundColors = [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
            ];


            console.log("🚀 ~ DashboardController ~ outletwiseCollectionData", {
                labels: labels,
                data: data,
                rawData: processedData
            })

            res.json({
                labels: labels,
                data: data,
                rawData: processedData
            });


        } catch (error) {
            console.error("Error in outletwiseCollectionData:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    async MakeAReport() {
        try {
            const dataForReport = await Reservation.findAll({
                include: [
                    {
                        model: Bill, 
                        as: 'bill', 
                        attributes: [] 
                    }
                ],
                attributes: [
                    'paymentStatus',
                    [sequelize.fn('COUNT', sequelize.col('Reservation.reservationId')), 'reservationCount'],
                    [sequelize.fn('SUM', sequelize.col('bill.totalAmount')), 'totalRevenue'] // SUM for bill's totalAmount
                ],
               
                group: ['Reservation.paymentStatus'], 
            });
            
    
            console.log("🚀 ~ DashboardController ~ MakeAReport ~ dataForReport:", dataForReport);
    
            let FullBillPaid = [];
            for (let index = 0; index < dataForReport.length; index++) {
                const element = dataForReport[index];
                console.log("🚀 ~ DashboardController ~ MakeAReport ~ element:", element);
            }
        } catch (error) {
            console.log("🚀 ~ DashboardController ~ MakeAReport ~ error:", error);
        }
    }
}



export default new DashboardController();