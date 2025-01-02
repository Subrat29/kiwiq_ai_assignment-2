export const defaultReport = [
    {
      type: 'Heading',
      text: 'Employee Satisfaction Survey Analysis'
    },
    {
      type: 'Subheading',
      text: 'Executive Summary'
    },
    {
      type: 'Text',
      text: 'This report analyzes the results of our annual employee satisfaction survey, highlighting key findings and trends across different departments and satisfaction metrics.'
    },
    {
      type: 'Subheading',
      text: 'Overall Satisfaction Trends'
    },
    {
      type: 'LineChart',
      data: [75, 78, 82, 80],
      labels: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    {
      type: 'Text',
      text: 'Employee satisfaction has shown a general upward trend over the past year, with a slight decrease in Q4 that warrants attention.'
    },
    {
      type: 'Subheading',
      text: 'Department Satisfaction Comparison'
    },
    {
      type: 'BarChart',
      data: [85, 78, 82, 76],
      labels: ['Engineering', 'Marketing', 'Sales', 'Support']
    },
    {
      type: 'Subheading',
      text: 'Key Satisfaction Factors'
    },
    {
      type: 'PieChart',
      data: [40, 25, 20, 15],
      labels: ['Work-Life Balance', 'Career Growth', 'Compensation', 'Work Environment']
    },
    {
      type: 'Text',
      text: 'Work-life balance emerged as the most significant factor in employee satisfaction, followed by career growth opportunities.'
    }
  ];