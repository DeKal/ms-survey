﻿surveyReportApp.controller('AgencyFilterController', function ($scope, $rootScope, $state, $q, AuthService,
                                        $window, ShowReportSurveyAPI, AgencyFilterCache, TOPS, USERS) {
   
    //level Vùng or Miền
    $scope.levels;
   
    //areas
    $scope.areas;


    $scope.regions = [

        { id: 100, name: 'Miền Tây' },
        { id: 101, name: 'Miền Đông & HCM' },
        { id: 103, name: 'Miền Trung & Cao Nguyên' },
        { id: 104, name: 'Nam Sông Hồng' },
        { id: 105, name: 'Bắc Sông Hồng' },
    ]
    //selected option (models)
    $scope.selected_option;

    $scope.lock = {
        company: false,
        role: true,
    };

    // check if we should disable this
    $scope.userData;

    $scope.UpdateAreas = function () {
        if ($scope.selected_option.level.code === "T")
            $scope.areas = $scope.userData.provinces;
        else
            $scope.areas = $scope.regions;
        $scope.selected_option.area = $scope.areas[0];
    }

    //clicking 
    ///click view report button
    $scope.viewReport = function () {
        
        $scope.CacheData();
        window.history.back();
    };

    // grants appropriate priviledges to user
    function userPriviledge() {
        var user_info = $scope.userData;

        switch (user_info.role) {

            case USERS.RSM:
            case USERS.NSM:
                $scope.levels = [{ id: 0, name: "Miền", code: "M" }, { id: 1, name: "Tỉnh", code: "T" }];
                break;

            default:
                $scope.levels = [{ id: 0, name: "Tỉnh", code: "T" }];

        }
        var selected_option = AgencyFilterCache.GetSelectedOption();



        
        switch (user_info.role) {
            case USERS.SUPERVISOR:
            case USERS.ASM:
            case USERS.RSM:
                $scope.lock.company = true;
                break;   
        }
        if (selected_option.level.code === "T")
            $scope.areas = $scope.userData.provinces;
        else
            $scope.areas = $scope.regions;
        

    }

    //Init data
    //cache the data
    $scope.CacheData = function () {
        AgencyFilterCache.CacheSelectedOption($scope.selected_option);
    }

    //init the data forr first time 
    $scope.init = function () {
        // restore cache
        $scope.selected_option = AgencyFilterCache.GetSelectedOption();

        // sample function
        $scope.userInit();

    };

    // sample function
    // init using user data
    // add data to the selected_option if you want the value to show
    $scope.userInit = function () {
        $scope.userData = ShowReportSurveyAPI.GetUserInfo();
        console.log($scope.userData);
        userPriviledge();

    }


    //when init the controller
    $scope.init();



})