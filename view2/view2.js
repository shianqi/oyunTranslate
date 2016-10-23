'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope','$http',function($scope,$http) {
        $scope.inputText = "";
        $scope.results = [];
        $scope.abouts = [];
        $scope.resultsSize = 0;
        $scope.aboutsSize = 0;
        $scope.results2 = [];
        $scope.submit = function(){
            if($scope.inputText==""){
                alert("请输入关键词进行查询");
                return;
            }
            $scope.isLoading = true;
            var data = {'judge':'汉文--传统蒙古文' , 'userInput':$scope.inputText};
            $http.post("http://dic.mglip.com/Default.aspx/GetArray",data)
                .success(function (date) {
                    $scope.results = [];
                    $scope.abouts = [];
                    $scope.resultsSize = 0;
                    $scope.aboutsSize = 0;
                    if(date.d==null){
                        alert("未查到结果")
                    }else{
                        date.d.forEach(function (e) {
                            if(e.chinese==$scope.inputText||e.chinese==$scope.inputText+' '){
                                $scope.resultsSize ++;
                                $scope.results.push(e);
                            }else {
                                $scope.aboutsSize ++;
                                $scope.abouts.push(e);
                            }
                        });
                    }
                    $scope.isLoading = false;
                })
                .error(function () {
                    alert("查询失败");
                    $scope.isLoading = false;
                });
            };
        $scope.haveResults = function(){
            if($scope.results.length==0&&$scope.abouts.length==0){
                return false;
            }else{
                return true;
            }
        };

        $scope.mainHorizontal = true;
        $scope.focus = function () {
            $scope.mainHorizontal = false;
        };

        $scope.blur = function () {
            $scope.mainHorizontal = true;
        };

        $scope.haveAbout = function () {
            if($scope.aboutsSize==0){
                return false;
            }else{
                return true;
            }

        };
        $scope.haveResult = function () {
            if($scope.resultsSize==0){
                return false;
            }else{
                return true;
            }

        };

        $scope.isLoading = false;
    }]);