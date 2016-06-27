myApp.controller('TodoController', function($scope, $db) {
    $scope.init = function() {
        $scope.todos = [];
        var query = "SELECT * FROM todos";
        $db.query(query).then(function(results) {
            // console.log(results);
            for (var i = 0; i < results.rows.length; i++) {
                $scope.todos.push(results.rows.item(i));
            }
        });
    }
    $scope.insert = function(todo) {
        if(angular.isUndefined(todo) || todo === null)
        {
            return;
        }
        else
        {
            // console.log(todo);
            $db.query("INSERT INTO todos(task,status) values(?,0)", [todo.task]).then(function() {
                $scope.Todo = null;
                $scope.init();
            });
        }
    }
    $scope.selected = {}
        // gets the template to ng-include for a table row / item
    $scope.getTemplate = function(contact) {
        if (contact.id === $scope.selected.id) return 'edit';
        else return 'display';
    };
    $scope.reset = function() {
        $scope.selected = {};
    };
    // edit section here we show the edit values
    // GET request to todos/{editId}/edit
    $scope.edit = function(todo) {
        $scope.selected = angular.copy(todo);
    }
    $scope.toggle = function(todo) {
            console.log(todo.status);
            var status = !todo.status;
            status = status ? 1 : 0;
            console.log(status);
            $db.query("UPDATE todos SET status=? where id=?", [status, todo.id]).then(function(result) {
                $scope.reset();
                $scope.init();
            });
        }
        // update section,here we update the value which is edited
        // PUT request to todos/{updateId}
    $scope.update = function(todo) {
            $db.query("UPDATE todos SET task=? where id=?", [todo.task, todo.id]).then(function(result) {
                $scope.reset();
                $scope.init();
            });
        }
        // DELETE request to todos/{id}
    $scope.delete = function(id) {
        if (confirm('Are you sure?')) {
            $db.query("DELETE from todos where id=?", [id]).then(function(result) {
                $scope.init();
            });
        }
    }
    $scope.init();
});