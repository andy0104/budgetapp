
// var budgetController = (function(){
// 	var x = 23;
// 	var add = function(a){
// 		return (x + a);
// 	}

// 	return {
// 		publicTest: function(b){
// 			//console.log(add(b));
// 			return add(b);
// 		}
// 	}
// })();


// var uiController = (function(){
// 	//Coding

// })();

// var appController = (function(budgetCtrl, uiCtrl){

// 	var z = budgetCtrl.publicTest(13);

// 	return {
// 		anotherPublic: function(){
// 			console.log('Z value from budget controller: ', z);
// 		}
// 	};

// })(budgetController, uiController);


var budgetController = (function(){
	//Budget controller code
	var Expense = function(id, description, val){
		this.id = id;
		this.description = description;
		this.val = val;
	};

	var Income = function(id, description, val){
		this.id = id;
		this.description = description;
		this.val = val;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	};

	return {
		addItem: function(type, des, val){
			var newItem, id = 0;

			//Create new ID by last id of type iyem plus 1
			if (data.allItems[type].length > 0){
				id = data.allItems[type][data.allItems[type].length - 1].id + 1;
			}else {
				id = 1;
			}
			if (type === 'inc'){
				newItem = new Income(id, des, val);
			}else if (type === 'exp'){
				newItem = new Expense(id, des, val);
			}

			//Push the new item in data structure
			data.allItems[type].push(newItem);

			//return the new item
			return newItem;
		},
		testing: function(){
			console.log('Data Structure: ', data);
		}
	};
})();


var uiController = (function(){
	//Coding
	var domStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtnAdd: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list'
	};

	return {
		getInput: function(){
			var type = document.querySelector(domStrings.inputType).value; //inc -> +/exp -> -
			var description = document.querySelector(domStrings.inputDescription).value;
			var val = document.querySelector(domStrings.inputValue).value;

			return {type: type, description: description, val: val};
		},
		clearFields: function(){
			var fields, fieldsArray;
			fields = document.querySelectorAll(domStrings.inputValue + ',' + domStrings.inputDescription);
			console.log('Selector All Fields: ', fields);

			fieldsArray = Array.prototype.slice.call(fields);
			console.log('Selector All Fields Array: ', fieldsArray);

			fieldsArray.forEach(function(row){
				console.log('Fields Row: ', row);
				row.value = '';
			});

			fieldsArray[0].focus();
		},
		getDOMStrings: function(){ return domStrings; },
		addListItem: function(obj, type){
			var placeholder, newPlaceholder, element;

			//create html body string with placeholders
			if (type === 'inc'){
				element = domStrings.incomeContainer;

				placeholder = `<div class="item clearfix" id="income-%id%">
										<div class="item__description">%description%</div>
										<div class="right clearfix">
											<div class="item__value">+ %value%</div>
											<div class="item__delete">
												<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
											</div>
										</div>
									</div>`;
			}else if (type === 'exp'){
				element = domStrings.expenseContainer;

				placeholder = `<div class="item clearfix" id="expense-%id%">
									<div class="item__description">%description%</div>
									<div class="right clearfix">
										<div class="item__value">- %value%</div>
										<div class="item__percentage">21%</div>
										<div class="item__delete">
											<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
										</div>
									</div>
								</div>`;
			}

			//replace placeholders with actual data
			newPlaceholder = placeholder.replace('%id%', obj.id);
			newPlaceholder = newPlaceholder.replace('%description%', obj.description);
			newPlaceholder = newPlaceholder.replace('%value%', obj.val);

			//insert html into the document
			document.querySelector(element).insertAdjacentHTML('beforeend', newPlaceholder);
			// if (type === 'inc'){
			// 	document.querySelector(domStrings.incomeContainer).insertAdjacentHTML('beforeend', newPlaceholder);
			// }else if (type === 'exp'){
			// 	document.querySelector(domStrings.expenseContainer).insertAdjacentHTML('beforeend', newPlaceholder);
			// }
		}
	}

})();

//MAIN APP CONTROLLER
var appController = (function(budgetCtrl, uiCtrl){

	var setupEventListeners = function(){
		var DOMStrings = uiCtrl.getDOMStrings();
		//Main app controller
		document.querySelector(DOMStrings.inputBtnAdd).addEventListener('click', function(){
			console.log('Add button clicked');
			appAddItem();
		});

		document.addEventListener('keypress', function(event){
			//console.log('Event', event.keyCode);
			if (event.keyCode === 13 || event.which === 13){
				console.log('ENTER was pressed');
				appAddItem();
			}
		});
	};

	var appAddItem = function(){
		console.log('App Add Item');

		//get the input data
		var input = uiCtrl.getInput();
		console.log('Inputs: ', input);

		//add the item to the budget controller
		var item = budgetCtrl.addItem(input.type, input.description, input.val);
		console.log('New Item: ', item);

		//add the item to UI
		budgetCtrl.testing();
		uiCtrl.addListItem(item, input.type);

		//clear the input fields
		uiCtrl.clearFields();

		//calculate the budget

		//display the budget on ui
	}

	return {
		init: function(){
			console.log('Application has started.');
			setupEventListeners();
		}
	};
})(budgetController, uiController);

appController.init();
