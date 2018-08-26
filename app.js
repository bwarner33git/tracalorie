// Storage Controller

// Item Controller
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // Data Structure
    const data = {
        items: [],
        currentItem: null,
        totalCalories: 0
    };

    // Public method
    return {
        logData: function() {
            return data;
        },
        getItems: function() {
            return data.items;
        },
        addItem: function(item) {
            const newItem = new Item(null, item.name, item.calories);
            data.items.push(newItem);
            const newID = data.items.length - 1;
            data.items[newID].id = newID;
        },
        totalCalories: function() {
            let total = 0;
            data.items.forEach((item) => {
                total += item.calories;
                console.log('each item calories: ' + item.calories);
            });
            data.totalCalories = total;

            return {
                totalCalories: data.totalCalories
            }
        },
        getItemById: function(id) {
            return data.items[id];
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        updateCurrentItem: function(name, calories) {
            data.items.forEach(function(item){
                if(item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;

                    console.log(item);
                }
            });
        }
    }
})();

// UI Controller
const UICtrl = (function(){

    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemName: '#item-name',
        itemCalories: '#item-calories',
        totalCalories: '.total-calories',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn'
    };

    // Public Methods
    return {

        populateItemList: function(items) {
            let html = '';
            items.forEach(function(item){
                html += '<li class="collection-item" id="item-' + item.id + '"><strong>' + item.name + '</strong> <em>Calories: ' + item.calories + '</em><a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a></li>';
            });
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function() {
            return UISelectors;
        },
        getItemInput: function() {
            return {
                id: null,
                name: document.querySelector(UISelectors.itemName).value,
                calories: parseInt(document.querySelector(UISelectors.itemCalories).value)
            }
        },
        getTotalCalories: function(calories) {
            document.querySelector(UISelectors.totalCalories).innerText = calories;
        },
        clearInput: function() {
            document.querySelector(UISelectors.itemName).value = '';
            document.querySelector(UISelectors.itemCalories).value = '';
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemName).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCalories).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        }

    }

})();

// App Controller
const App = (function(ItemCtrl, UICtrl){

    // Load Event Listeners
    const loadEventListeners = function() {

        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditSubmit);

        // Item update submit
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    }
    

    // Add Item Submit
    const itemAddSubmit = function(e) {
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();
        
        // Check for name and calorie input
        if(input.name !== '' && input.calories !== '') {
            // Add item input values to stored data
            new Promise(function(resolve, reject){
                ItemCtrl.addItem(input);
                resolve();
            }).then(function(){
                // Populate list with items
                UICtrl.populateItemList(ItemCtrl.getItems());

                // Display the total Calories
                const addUp = ItemCtrl.totalCalories();

                UICtrl.getTotalCalories(addUp.totalCalories);
            });

            console.log(ItemCtrl.getItems());
        }

        e.preventDefault();
    };

     // Edit Item
     const itemEditSubmit = function(e) {
        if(e.target.classList.contains('edit-item')) {

            // Get list item id, example: (item-0, item-1)
            const listId = e.target.parentNode.parentNode.id;
            // Break into an array
            const listIdArr = listId.split('-');
            // Get Number from array
            const id = parseInt(listIdArr[1]);

            //Get item
            const itemToEdit = ItemCtrl.getItemById(id);
            // Set the current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Set Current item to form for editing
            UICtrl.addItemToForm();
        }
        e.preventDefault();
    };

    const itemUpdateSubmit = function(e) {

        // Get new values from form fields for name and calories
        const nameUpdate = document.getElementById('item-name').value;
        const caloriesUpdate = document.getElementById('item-calories').value;

        // Update the item properties
        ItemCtrl.updateCurrentItem(nameUpdate, caloriesUpdate);

        e.preventDefault();
    }

    return {

        init: function() {

            // Clear edit state
            UICtrl.clearEditState();

            // Fetch items from data structure
            const items = ItemCtrl.getItems();
            
            // Populate list with items
            UICtrl.populateItemList(items);

            // Load event listeners
            loadEventListeners();

        }

    }

})(ItemCtrl, UICtrl);

App.init();