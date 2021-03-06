'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', ['$scope','$http',function($scope,$http) {
        $scope.mainHorizontal = true;
        $scope.focus = function () {
            $scope.mainHorizontal = false;
        };

        $scope.blur = function () {
            $scope.mainHorizontal = true;
        };

        $scope.checkEnter = function (e) {
            var et=e||window.event;
            var keycode=et.charCode||et.keyCode;
            if(keycode==13)
            {
                $scope.submit();
                if(window.event)
                    window.event.returnValue = false;
                else
                    e.preventDefault();//for firefox
            }
        };

        $scope.inputText = "";
        $scope.results = [];
        $scope.abouts = [];
        $scope.resultsSize = 0;
        $scope.aboutsSize = 0;
        $scope.results2 = [];
        $scope.submit = function(){
            var input = document.getElementById('inputVertical');
            $scope.inputText = input.innerText;
            if($scope.inputText==""){
                alert("请输入关键词进行查询");
                return;
            }
            $scope.isLoading = true;
            $scope.results = [];
            $scope.abouts = [];
            $scope.resultsSize = 0;
            $scope.aboutsSize = 0;
            $scope.results2 = [];

            var data = {'judge':'传统蒙古文--汉文' , 'userInput':$scope.inputText};
            $http.post("http://dic.mglip.com/Default.aspx/GetArray",data)
                .success(function (date) {

                    if(date.d==null){
                        alert("未查到结果")
                    }else{
                        date.d.forEach(function (e) {
                            $scope.results2.push(e);
                            if(e.mogInteCode==$scope.inputText||e.mogInteCode==$scope.inputText+' '){
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
            //var response = {"d":[{"__type":"Dictionary","id":0,"chinese":"吃饱 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"гэдэс гарах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0},{"__type":"Dictionary","id":0,"chinese":"吃饱;饱足 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"цадах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0},{"__type":"Dictionary","id":0,"chinese":"使之吃饱;让人吃饱 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"цатгах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0}]};
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

        $scope.haveResults = function(){
            if($scope.results.length==0&&$scope.abouts.length==0){
                return false;
            }else{
                return true;
            }
        };
        $scope.isLoading = false;
    }]);