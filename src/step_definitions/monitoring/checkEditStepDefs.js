import { Then, When } from 'cucumber';
const checkEditSteps = require(__srcdir + '/steps/monitoring/checkEditSteps.js');

let ckEdSteps = new checkEditSteps(__wdriver);

Then(/^the edit check overlay is loaded$/, async() => {
    await ckEdSteps.isLoaded();
    await ckEdSteps.verifyIsLoaded();
});

Then(/^the edit check overlay is not loaded$/, async () => {
   await ckEdSteps.verifyIsNotLoaded();
});

When(/^click the check editor save button$/, async () => {
   await ckEdSteps.clickCKEdSaveButton();
});

When(/^dismiss edit chck overlay$/, async () => {
   await ckEdSteps.dismissOverlay();
});

When(/^enter the alert check name "(.*)"$/, async name => {
    await ckEdSteps.enterAlertCheckName(name);
});

When(/^click check editor configure check button$/, async () => {
   await ckEdSteps.clickCkEdConfigureCheck();
});

Then(/^the configure check view is loaded$/, async () => {
   await ckEdSteps.verifyConfigureCheckStepLoaded();
});

Then(/^the create check checklist contains:$/, async items => {
    await ckEdSteps.verifyChecklistPopoverItems(items);
});

Then(/^the interval indicator is set to "(.*)"$/, async duration => {
   await ckEdSteps.verifyCkEdIntervalInput(duration);
});

When(/^click on check interval input$/, async () => {
   await ckEdSteps.clickCkEdIntervalInput();
});

When(/^enter into interval offset "(.*)"$/, async offset => {
   await ckEdSteps.enterIntoIntervalOffset(offset);
});

Then(/^the check interval hint dropdown list is not visible$/, async () => {
   await ckEdSteps.verifyCkEdHintDropdownNotVisible();
});

Then(/^the check interval hint dropdown list includes$/, async items => {
   await ckEdSteps.verifyCkEdHintDropdownItems(items);
});

When(/^click the interval hint dropdown list item "(.*)"$/, async item => {
    await ckEdSteps.clickCkEdHintDropdownItem(item);
});

When(/^click the check offset interval input$/, async () => {
   await ckEdSteps.clickCkEdOffsetInput();
});

Then(/^the check offset hint dropdown list is not visible$/, async () => {
    await ckEdSteps.verifyCkEdHintDropdownNotVisible();
});

Then(/^the check offset hint dropdown list includes$/, async items => {
    await ckEdSteps.verifyCkEdHintDropdownItems(items);
});

When(/^click the offset hint dropdown list item "(.*)"$/, async item => {
    await ckEdSteps.clickCkEdHintDropdownItem(item);
});

Then(/^the offset input is set to "(.*)"$/, async val => {
    ckEdSteps.verifyCkEdOffsetInput(val);
});

When(/^update the check message template to$/, async content => {
   await ckEdSteps.updateChecMessageTemplateContent(content);
});

When(/^click add threshold condition "(.*)"$/, async threshold => {
   await ckEdSteps.clickAddThresholdCondition(threshold);
});

When(/^click the threshold definition dropdown for condition "(.*)"$/, async threshold => {
   await ckEdSteps.clickThresholdDefinitionDropdown(threshold);
});

When(/^click the threshold definition dropodown item "(.*)" for condition "(.*)"$/,
    async (item, threshold) => {
   await ckEdSteps.clickThresholdDefinitionDropdownItem(threshold, item);
});

When(/^set the unary boundary value for the threshold definition "(.*)" to "(.*)"$/,
   async (threshold, val1) => {
    await ckEdSteps.setUnaryThresholdBoundaryValue(threshold, val1);
});

