import { Then, When } from 'cucumber';
const dashboardSteps = require(__srcdir + '/steps/dashboards/dashboardSteps.js');

let dbdSteps = new dashboardSteps(__wdriver);

When(/^name dashboard "(.*)"$/, async name => {
    await dbdSteps.nameDashboard(name);
});

Then(/^the dashboard named "(.*)" is loaded$/, async name => {
    await dbdSteps.verifyDashboardLoaded(name);
});

Then(/^the new dashboard page is loaded$/, async () => {
    await dbdSteps.verifyDashboardLoaded('Name this Dashboard');
});

Then(/^the dashboard contains a cell named "(.*)"$/, async name => {
    await dbdSteps.verifyDashboardCellVisible(name);
});
