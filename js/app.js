'use strict';

/**
 * app 入口文件
 * 语言 AngularJs
 * 如果要增加界面，要在这里配置路由
 * @author shianqi@imudges.com
 */
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.view3',
    'myApp.view4',
    'myApp.view5'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }])
    .controller('ctrl', ['$scope','$location',function($scope,$location) {
        $scope.layout = 'layout';

        $scope.isFirst = function () {
            if($location.url()=="/view1")
            {
                $scope.layout = '';
                return true;
            }else{
                $scope.layout = 'layout';
                return false;
            }
        };

        $scope.$on('$viewContentLoaded', function(){
            var layout   = document.getElementById('layout'),
                menu     = document.getElementById('menu'),
                menuLink = document.getElementById('menuLink');

            var a = document.getElementsByClassName('pure-menu-link');

            if($location.url()!="/view1"){
                var pure = document.getElementById('logo');
                pure.onclick = function (e) {
                    var active = 'active';
                    if($location.url()!="/view1"){
                        toggleClass(layout, active);
                    }
                    toggleClass(menuLink, active);
                };
            }



            function toggleClass(element, className) {
                var classes = element.className.split(/\s+/),
                    length = classes.length,
                    i = 0;

                for(; i < length; i++) {
                    if (classes[i] === className) {
                        classes.splice(i, 1);
                        break;
                    }
                }
                // The className is not found
                if (length === classes.length) {
                    classes.push(className);
                }

                element.className = classes.join(' ');
            }

            menuLink.onclick = function (e) {
                var active = 'active';
                e.preventDefault();
                toggleClass(layout, active);
                toggleClass(menuLink, active);
            };
        });
    }]);
