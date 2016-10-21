'use strict';

angular.module('myApp.view4', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'view4/view4.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl', ['$scope','$http',function($scope,$http) {
        $scope.inputText = "";
        $scope.results = [];
        $scope.abouts = [];
        $scope.submit = function(){
            if($scope.inputText==""){
                alert("请输入关键词进行查询");
                return;
            }
            $scope.isLoading = true;
            var data = {'judge':'汉文--西里尔蒙古文' , 'userInput':$scope.inputText};
            $http.post("http://dic.mglip.com/Default.aspx/GetArray",data)
                .success(function (date) {
                    $scope.results = [];
                    $scope.abouts = [];
                    date.d.forEach(function (e) {
                        if(e.chinese==$scope.inputText||e.chinese==$scope.inputText+' '){
                            $scope.results.push(e);
                        }else {
                            $scope.abouts.push(e);
                        }
                    });
                    $scope.isLoading = false;
                })
                .error(function () {
                    alert("查询失败");
                    $scope.isLoading = false;
                });
                //var response = {"d":[{"__type":"Dictionary","id":0,"chinese":"吃饱 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"гэдэс гарах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0},{"__type":"Dictionary","id":0,"chinese":"吃饱;饱足 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"цадах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0},{"__type":"Dictionary","id":0,"chinese":"使之吃饱;让人吃饱 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"цатгах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0}]};
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

        $scope.isLoading = false;
    }]);