'use strict';

angular.module('myApp.view6', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view6', {
            templateUrl: 'view6/view6.html',
            controller: 'View6Ctrl'
        });
    }])

    .controller('View6Ctrl', ['$scope','$http',function($scope,$http) {
        $scope.inputText = "";
        $scope.results = [];
        $scope.aboutss = [];
        $scope.requsetStr = "";
        $scope.submit = function(){
            $scope.requsetStr = $scope.inputText;
            $scope.results = [];
            $scope.aboutss = [];
            if($scope.inputText==""){
                alert("请输入关键词进行查询");
                return;
            }
            $scope.isLoading = true;
            // var data = {'Name':$scope.inputText};
            var data = 'Name: ' + $scope.inputText;
            $http.post("http://202.207.12.185:81/WebService.asmx/Get_mon_name", data)
                .success(function (res) {
                    if(res==null){
                        alert("未查到结果")
                    }else{
                        $scope.results.push(res);
                    }
                    $scope.isLoading = false;
                })
                .error(function () {
                    alert("查询失败");
                    $scope.isLoading = false;
                });
            //var response = {"d":[{"__type":"Dictionary","id":0,"chinese":"吃饱 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"гэдэс гарах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0},{"__type":"Dictionary","id":0,"chinese":"吃饱;饱足 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"цадах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0},{"__type":"Dictionary","id":0,"chinese":"使之吃饱;让人吃饱 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"цатгах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0}]};
        };
        $scope.haveResults = function(){
            if($scope.results.length==0&&$scope.aboutss.length==0){
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
String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
};