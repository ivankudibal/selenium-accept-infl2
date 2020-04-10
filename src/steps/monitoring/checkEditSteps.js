const influxSteps = require(__srcdir + '/steps/influx/influxSteps.js');
const checkEditPage = require(__srcdir + '/pages/monitoring/checkEditPage.js');

class checkEditSteps extends influxSteps {

    constructor(driver) {
        super(driver);
        this.ckEdPage = new checkEditPage(__wdriver);
    }

    async isLoaded() {
        await this.ckEdPage.isLoaded();
    }

    async verifyIsLoaded() {
        await this.assertVisible(await this.ckEdPage.getPageCheckEditTitle());
        await this.assertVisible(await this.ckEdPage.getQueriesToggle());
        await this.assertVisible(await this.ckEdPage.getConfigureCheckToggle());
    }

    async verifyIsNotLoaded(){
        await this.assertNotPresent(checkEditPage.getOverlaySelector());
    }

    async dismissOverlay(){
        await this.clickAndWait(await this.ckEdPage.getDismissButton());
    }


    async enterAlertCheckName(name){
        await this.clickAndWait(await this.ckEdPage.getPageCheckEditTitle());
        await this.clearInputText(await this.ckEdPage.getPageCheckEditTitleInput());
        await this.typeTextAndWait(await this.ckEdPage.getPageCheckEditTitleInput(), name);
    }

    async clickCkEdConfigureCheck(){
        await this.clickAndWait(await this.ckEdPage.getConfigureCheckToggle());
    }

    async verifyCkEdDurationIndicator(duration){
        await this.verifyElementAttributeContainsText(await this.ckEdPage.getConfChkIntervalInput(),
            'value', duration );
    }

    async enterIntoDurationOffset(offset){
        await this.clearInputText(await this.ckEdPage.getConfChkOffset());
        await this.typeTextAndWait(await this.ckEdPage.getConfChkOffset(), offset);
    }

}

module.exports = checkEditSteps;
