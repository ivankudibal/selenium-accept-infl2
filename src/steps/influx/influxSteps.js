//const assert = require('chai').assert;
const expect = require('chai').expect;
const baseSteps = require(__srcdir + '/steps/baseSteps.js');
const influxPage = require(__srcdir + '/pages/influxPage.js');

class influxSteps extends baseSteps {

    constructor(driver){
        super(driver);
        this.influxPage = new influxPage(driver);
    }

    async isLoaded(){
        await this.influxPage.isLoaded();
    }

    async verifyIsLoaded(){
        this.assertVisible(await this.influxPage.getNavMenu());
        this.assertVisible(await this.influxPage.getMenuHome());
        this.assertVisible(await this.influxPage.getMenuExplorer());
        this.assertVisible(await this.influxPage.getMenuDashboards());
        this.assertVisible(await this.influxPage.getMenuTasks());
        this.assertVisible(await this.influxPage.getMenuSettings());
        this.assertVisible(await this.influxPage.getMenuFeedback());
    }

    async getNavMenuElem(item){
        let elem = undefined;
        switch(item.toLowerCase()){
        case 'home':
            elem = await this.influxPage.getMenuHome();
            break;
        case 'home:heading':
            elem = await this.influxPage.getMenuHomeHeading();
            break;
        case 'home:neworg':
            elem = await this.influxPage.getMenuHomeNewOrg();
            break;
        case 'home:logout':
            elem = await this.influxPage.getMenuHomeLogout();
            break;
        case 'explorer':
            elem = await this.influxPage.getMenuExplorer();
            break;
        case 'dashboards':
            elem = await this.influxPage.getMenuDashboards();
            break;
        case 'tasks':
            elem = await this.influxPage.getMenuTasks();
            break;
        case 'settings':
            elem = await this.influxPage.getMenuSettings();
            break;
        case 'feedback':
            elem = await this.influxPage.getMenuFeedback();
            break;
        default:
            throw `Unkown menu item ${item}`;
        }
        return elem;
    }

    async hoverNavMenu(item){
        this.hoverOver(await this.getNavMenuElem(item));
    }

    async verifySubMenuItems(item, state = 'hidden'){
        if(state === 'hidden'){
            this.assertNotVisible(await this.getNavMenuElem(item));
        }else if(state === 'visible'){
            this.assertVisible(await this.getNavMenuElem(item));
        }else{
            throw `unkown menu state ${state}`;
        }
    }

    async clickMenuItem(item){
        await this.getNavMenuElem(item).then(async elem => {
            await elem.click();
        });
    }

    async clickSubMenuItem(item){
        await this.influxPage.getSubItemByText(item).then( async elem => {
            await elem.click();
        });
    }

    async verifyVisibilityNavItemByText(text, visible = true){
        if(visible) {
            await this.assertVisible(await this.influxPage.getSubItemByText(text));
        }else{
            await this.assertNotVisible(await this.influxPage.getSubItemByText(text));
        }
    }

    async verifyHeaderContains(text){
        await this.influxPage.getPageHeader().then(async elem => {
            await elem.getText().then(async elTxt => {
                expect(elTxt).to.include(text);
            });
        });
    }

    async verifyFeedbackLinkContains(text){
        await this.getNavMenuElem('feedback').then(async elem => {
            await elem.findElement({xpath: './..'}).then(async el2 => { //the getNavMenuElem method uses span inside a tag
                await el2.getAttribute('href').then(async attrib =>{
                    expect(attrib).to.include(text);
                });
            });
        });
    }


}

module.exports = influxSteps;
