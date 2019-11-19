Feature: Dashboards - Base
  As a user I want to Read Create Update and Delete Dashboards
  So that I can organize my data in Influxdbv2

  Scenario: Load dashboards page
    Given I reset the environment
    Given run setup over REST "DEFAULT"
    When open the signin page
    When UI sign in user "DEFAULT"
    When hover over the "Dashboards" menu item
    When click nav sub menu "Dashboards"
    Then the Dashboards page is loaded
    When API sign in user "DEFAULT"
    When API create a label "Cesko" described as "Pravda vitezi" with color "#AAFFAA" for user "DEFAULT"
    When API create a label "Mesto" described as "Matka mest" with color "#FFAAAA" for user "DEFAULT"
    When generate a line protocol testdata for user "DEFAULT" based on:
    """
    { "points": 120, "measurement":"level", "start": "-30d", "algo": "hydro", "prec": "sec"}
    """
    When generate a line protocol testdata for user "DEFAULT" based on:
    """
    { "points": 120, "measurement":"beat", "start": "-30d", "algo": "sine", "prec": "sec"}
    """


  Scenario: Create new dashboard
    When click the empty Create dashboard dropdown button
    Then the empty create dashboard dropdown list contains
    """
  New Dashboard,Import Dashboard,From a Template
    """
    When click the create dashboard item "New Dashboard"
    Then the new dashboard page is loaded
    When hover over the "Dashboards" menu item
    When click nav sub menu "Dashboards"
    Then the empty Create dashboard dropdown button is not present
    Then there is a dashboard card named "Name this Dashboard"

  Scenario: Rename dashboard from card
    When hover over dashboard card named "Name this Dashboard"
    Then the export button for the dashboard card "Name this Dashboard" is visible
    Then the clone button for the dashboard card "Name this Dashboard" is visible
    Then the delete button for the dashboard card "Name this Dashboard" is visible
    When hover over dashboard card name "Name this Dashboard"
    When click the edit dashboard card name button for "Name this Dashboard"
    When clear the name input of the dashboard card "Name this Dashboard"
    When enter the new name "Mercure" in the name input of the dashboard card "Name this Dashboard"
    When press the "ENTER" key
    Then there is a dashboard card named "Mercure"
    Then there is no dashboard card named "Name this Dashboard"

  Scenario: Add description to dashboard
    Then the description for card "Mercure" contains "No description"
    When hover over description of the dashboard card "Mercure"
    When click the edit description button for the dashboard card "Mercure"
    When enter into the dashboard card "Mercure" the description:
    """
    le dieu du commerce dans la mythologie romaine
    """
    When press the "ENTER" key
    Then the description for card "Mercure" contains "le dieu du commerce dans la mythologie romaine"

  Scenario: Add Labels to dashboard
    When click empty label for the dashboard card "Mercure"
    Then the label "Cesko" in the popover selector is visible
    Then the label "Mesto" in the popover selector is visible
    Then the  create new label item is not visible in the popover
    When enter "Slovensko" in the popover label selector filter
    Then the create new label item is visible in the popover
    Then there are "0" label pills in the select label popover
    When click the new label item in the add labels popover
    Then the create Label popup is loaded
    When dismiss the popup
    Then popup is not loaded
    Then the add label popover is not present
    When click the add label button for the dashboard card "Mercure"
    Then there are "2" label pills in the select label popover
    When enter "Slovensko" in the popover label selector filter
    When click the new label item in the add labels popover
    When click the label popup Create Label button
    Then popup is not loaded
    Then the dashboard card "Mercure" has the label "Slovensko"
    When hover over the label "Slovensko" of the dashboard card "Mercure"
    When click remove label "Slovensko" from the dashboard card "Mercure"
    Then the dashboard card "Mercure" labels empty message is visible
    Then the label "Slovenkso" of the dashboard card "Mercure" is not present
    When click the add label button for the dashboard card "Mercure"
    Then there are "3" label pills in the select label popover
    When enter "sko" in the popover label selector filter
    Then there are "2" label pills in the select label popover
    Then the label "Mesto" is not present in the popover selector
    When clear the popover label selector filter
    Then there are "3" label pills in the select label popover
    When press the "ESCAPE" key
    Then the add label popover is not present

  Scenario Outline: Create new Dashboard
    When click create dashboard control
    When click the create dashboard item "New Dashboard"
    When name dashboard "<NAME>"
    When hover over the "Dashboards" menu item
    When click nav sub menu "Dashboards"
    Then there is a dashboard card named "<NAME>"

    Examples:
    |NAME|
    |Venus|
    |Terre|
    |Mars |
    |Jupiter|

  Scenario: Access Dashboard from home page
    When hover over the "home" menu item
    When click nav menu item "home"
    Then the dashboards panel contains links:
    """
    Mercure,Venus,Terre,Mars,Jupiter
    """
    When click the dashboards panel link 'Mercure'
    Then the dashboard named "Mercure" is loaded

  Scenario: Filter Dashboard Cards
    When hover over the "Dashboards" menu item
    When click nav sub menu "Dashboards"
    Then the dashboards page contains the cards:
    """
    Mercure,Venus,Terre,Mars,Jupiter
    """
    When enter the term "ter" in the dashboards filter
    Then the dashboards page contains the cards:
    """
    Terre,Jupiter
    """
    Then the dashboards page does not contain the cards:
    """
    Mercure,Venus,Mars
    """
    When clear the dashboards filter
    Then the dashboards page contains the cards:
    """
    Mercure,Venus,Terre,Mars,Jupiter
    """

  Scenario: Import Dashboard

  Scenario: Create Dashboard from template


