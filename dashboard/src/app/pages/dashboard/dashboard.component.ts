import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";
import { ApiService } from 'src/app/_services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  courses: any[] = [];
  users: any;

  allTransactions: any[] = [];
  totalAmount: [];
  percentagechange: string;
  yesterdaysale: any;
  totalPurchases: any;
  currentMonthTotal: any;
  previousMonthTotal: any;
  allpuchasepercentageChange: string | null = null;
  previousWeekCourseCount: any;
  currentWeekCourseCount: any;
  coursePercentageChange: any;
  previousMonthUserCount: any;
  currentMonthUserCount: any;
  userPercentageChange: any;
  ordersChart: any;
  barChartData:any;


  constructor(private apiService: ApiService) { dayjs.extend(utc); }
  ngOnInit() {
    this.apiService.getAllCourses().subscribe(
      (allCourses) => {
        // console.log("allCourses", allCourses[0].courseImage);

        // Update the courseImage URLs directly
        this.courses = allCourses;
        console.log( this.courses,'hyyyyy')
        // Get the current date
        const currentDate = new Date();

        // Get the start and end dates of the previous week
        const prevWeekStart = new Date(currentDate);
        prevWeekStart.setDate(prevWeekStart.getDate() - 7); // 7 days ago
        const prevWeekEnd = new Date(currentDate);
        prevWeekEnd.setDate(prevWeekEnd.getDate() - 1); // Previous day

        // Count the courses created in the previous week
        this.previousWeekCourseCount = this.getCoursesCount(prevWeekStart, prevWeekEnd);

        // Count the courses created in the current week
        this.currentWeekCourseCount = this.getCoursesCount(prevWeekEnd, currentDate);

        // Calculate the percentage change
        const coursepercentageChange = ((this.currentWeekCourseCount - this.previousWeekCourseCount) / this.previousWeekCourseCount) * 100;
        this.coursePercentageChange = coursepercentageChange.toFixed(2) + '%'
        console.log('this.coursePercentageChange', this.coursePercentageChange)

        this.barChartData = this.getChartData(allCourses,6);
        var chartOrders = document.getElementById('chart-orders');

        parseOptions(Chart, chartOptions());
    
         var chartOrders = document.getElementById('chart-orders');
    
         var ordersChart = new Chart(chartOrders, {
           type: 'bar',
           options: chartExample2.options,
           data: {
            labels: this.barChartData.labels,
            datasets: [
              {
                label: "Sales",
                data: this.barChartData.salesData,
                maxBarThickness: 10
              }
            ]
          }
         });





        //  line chart
    



      },
      (error) => {
        console.error("Error fetching courses:", error);
      }
    );
    this.apiService.getAllUsers().subscribe(
      (allUsers) => {
        console.log("allUsers", allUsers);

        // Update the courseImage URLs directly
        this.users = allUsers;
        // Get the current date
        const currentDate = new Date();

        // Get the start and end dates of the previous month
        const prevMonthStart = new Date(currentDate);
        prevMonthStart.setDate(1); // First day of current month
        prevMonthStart.setMonth(prevMonthStart.getMonth() - 1); // First day of previous month
        const prevMonthEnd = new Date(currentDate);
        prevMonthEnd.setDate(0); // Last day of previous month

        // Count the users created in the previous month
        this.previousMonthUserCount = this.getUsersCount(prevMonthStart, prevMonthEnd);

        // Count the users created in the current month
        this.currentMonthUserCount = this.getUsersCount(prevMonthEnd, currentDate);

        // Calculate the percentage change
        if (this.previousMonthUserCount === 0) {
          this.userPercentageChange = '0';
          console.log(' this.userPercentageChange', this.userPercentageChange === '0')
        } else {

          const userpercentageChange = ((this.currentMonthUserCount - this.previousMonthUserCount) / this.previousMonthUserCount) * 100;
          this.userPercentageChange = userpercentageChange.toFixed(2) + '%'
          console.log(' this.userPercentageChange', this.userPercentageChange)
        }

        var lineChartData = this.getChartData(this.users,12);
        var chartSales = document.getElementById('chart-sales');


 

        this.salesChart = new Chart(chartSales, {
          type: 'line',
          options: chartExample1(this.datasets).options,
          data: {
            labels: lineChartData.labels,
            datasets: [
              {
                label: "Performance",
                data: lineChartData.salesData,
                maxBarThickness: 10
              }
            ]
          }
        });


      },
      (error) => {
        console.error("Error fetching courses:", error);
      }
    );
    this.apiService.getalltransaction().subscribe((allTransactions) => {
      this.allTransactions = allTransactions;

      // Get today's date in UTC
      const today = dayjs().utc();

      // Filter transactions for today
      const todayTransactions = allTransactions.filter((transaction) => {
        const transactionDate = dayjs(transaction.createdAt).utc();
        return transactionDate.isSame(today, 'day');
      });

      // Calculate total amount for today's transactions
      this.totalAmount = todayTransactions.reduce(
        (acc, transaction) => acc + parseFloat(transaction.amount),
        0
      );
      const todayTotalSales = todayTransactions.reduce(
        (acc, transaction) => acc + parseFloat(transaction.amount),
        0
      );
      console.log('this.totalAmount', this.totalAmount)
      // Filter transactions for yesterday
      const yesterday = dayjs().utc().subtract(1, 'day');
      const yesterdayTransactions = allTransactions.filter((transaction) => {
        const transactionDate = dayjs(transaction.createdAt).utc();
        return transactionDate.isSame(yesterday, 'day');
      });
      // Calculate total amount for yesterday's transactions
      const yesterdayTotalSales = yesterdayTransactions.reduce(
        (acc, transaction) => acc + parseFloat(transaction.amount),
        0
      );
      this.yesterdaysale = yesterdayTotalSales
      console.log('yesterdayTotalSales', yesterdayTotalSales)

      // Calculate percentage change
      const percentageChange = yesterdayTotalSales === 0 ? 0 : ((todayTotalSales - yesterdayTotalSales) / yesterdayTotalSales) * 100;
      console.log('Percentage change since yesterday: ' + percentageChange.toFixed(2) + '%');
      this.percentagechange = percentageChange.toFixed(2) + '%'
      console.log('this.percentagechange', this.percentagechange)
 

      // Calculate total purchase amount
      this.totalPurchases = allTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

      // Get current date
      const currentDate = new Date();

      // Calculate the first day of the current month
      const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

      // Filter transactions for the current month
      const currentMonthTransactions = allTransactions.filter((transaction) => new Date(transaction.createdAt) >= firstDayOfCurrentMonth);

      // Calculate the total purchases for the current month
      this.currentMonthTotal = currentMonthTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

      // Calculate the first day of the previous month
      const firstDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

      // Filter transactions for the previous month
      const previousMonthTransactions = allTransactions.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate >= firstDayOfPreviousMonth && transactionDate < firstDayOfCurrentMonth;
      });

      // Calculate the total purchases for the previous month
      this.previousMonthTotal = previousMonthTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

      // Calculate the percentage change between the current month and the previous month
      if (this.previousMonthTotal === 0) {
        this.allpuchasepercentageChange = '0'; // Set the percentage change to null if the previous month total is 0
        console.log('this.allpuchasepercentageChange', this.allpuchasepercentageChange === '0')
      } else {
        const puchasepercentageChange = ((this.currentMonthTotal - this.previousMonthTotal) / this.previousMonthTotal) * 100;
        console.log('allpuchasepercentageChange', puchasepercentageChange)
        this.allpuchasepercentageChange = puchasepercentageChange.toFixed(2) + '%'
        console.log('this.allpuchasepercentageChange', this.allpuchasepercentageChange)

      }
      const monthlyAmounts = {
        'Jan': 0, 'Feb': 20, 'Mar': 30, 'Apr': 50, 'May': 60, 'Jun': 0,
        'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0
      };
      

      allTransactions.forEach(transaction => {
        const month = dayjs(transaction.createdAt).utc().format('MMM');
        monthlyAmounts[month] += parseFloat(transaction.amount);
      });
      console.log('monthlyAmounts', monthlyAmounts)
      this.datasets = [
        monthlyAmounts.Jan,
        monthlyAmounts.Feb,
        monthlyAmounts.Mar,
        monthlyAmounts.Apr,
        monthlyAmounts.May,
        monthlyAmounts.Jun,
        monthlyAmounts.Jul,
        monthlyAmounts.Aug,
        monthlyAmounts.Sep,
        monthlyAmounts.Oct,
        monthlyAmounts.Nov,
        monthlyAmounts.Dec,
       
      ];
      this.data = this.datasets;
      // this.updateChart();
    });

  


     
  }

   public updateOptions() {
     this.salesChart.data.datasets.data = this.data;
     this.salesChart.update();
   }
 
  
 
  // Function to count the courses created between two dates
  getCoursesCount(startDate: Date, endDate: Date): number {
    return this.courses.filter((course) => {
      const courseDate = new Date(course.createdAt);
      return courseDate >= startDate && courseDate <= endDate;
    }).length;
  }

  // Function to count the users created between two dates
  getUsersCount(startDate: Date, endDate: Date): number {
    return this.users.filter((user) => {
      const userDate = new Date(user.createdAt);
      return userDate >= startDate && userDate <= endDate;
    }).length;
  }







  getChartData(data: any[], numberOfMonths: number): { labels: string[], salesData: number[] } {
    // Initialize arrays for labels and sales data
    const labels: string[] = [];
    const salesData: number[] = [];
  
    // Get the current date
    const currentDate = new Date();
  
    // Iterate over the specified number of previous months
    for (let i = numberOfMonths - 1; i >= 0; i--) {
      // Get the date for the i-th previous month
      const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
  
      // Get the month name and add it to the labels array
      const monthName = this.getMonthName(prevMonthDate.getMonth());
      labels.push(monthName);
  
      // Initialize the sales data for this month to 0
      salesData.push(0);
    }
  
    // Process data to increment sales data for existing records
    data.forEach(item => {
      const createdDate = new Date(item.createdAt);
      const monthIndex = createdDate.getMonth();
  
      // Check if the record falls within the specified number of previous months
      if (monthIndex >= currentDate.getMonth() - (numberOfMonths - 1) && monthIndex <= currentDate.getMonth()) {
        // Calculate the index based on the month difference between the current month and the record's creation month
        const index = numberOfMonths - 1 - (currentDate.getMonth() - monthIndex);
        salesData[index]++;
      }
    });
  
    // console.log(labels, salesData, data, '------------------------------------------------->');
  
    return { labels, salesData };
  }
  
  
  getMonthName(month: number): string {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[month];
  }

}








