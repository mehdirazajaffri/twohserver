(function () {
  'use strict';

  angular
    .module('reviewmailers')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Reviewmailers',
      state: 'reviewmailers',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'reviewmailers', {
      title: 'List Reviewmailers',
      state: 'reviewmailers.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'reviewmailers', {
      title: 'Create Reviewmailer',
      state: 'reviewmailers.create',
      roles: ['user']
    });
  }
}());
