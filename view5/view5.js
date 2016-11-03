'use strict';

angular.module('myApp.view5', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view5', {
            templateUrl: 'view5/view5.html',
            controller: 'View5Ctrl'
        });
    }])

    .controller('View5Ctrl', ['$scope','$http',function($scope,$http) {
        $scope.inputText = "";
        $scope.results = [];
        $scope.aboutss = [];
        $scope.submit = function(){
            if($scope.inputText==""){
                alert("请输入关键词进行查询");
                return;
            }
            $scope.isLoading = true;
            var data = {'judge':'西里尔蒙古文--汉文' , 'userInput':$scope.inputText};
            $http.post("http://dic.mglip.com/Default.aspx/GetArray",data)
                .success(function (date) {
                    $scope.results = [];
                    $scope.aboutss = [];
                    if(date.d==null){
                        alert("未查到结果")
                    }else{
                        date.d.forEach(function (e) {
                            if(e.newMog.trim()==$scope.inputText.trim()){
                                $scope.results.push(e);
                            }else {
                                $scope.aboutss.push(e);
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