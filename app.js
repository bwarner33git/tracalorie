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
        items: [
            { id: 0, name: 'Steak Dinner', calories: 1200 },
            { id: 1, name: 'Cookie', calories: 400 },
            { id: 2, name: 'Eggs', calories: 300 }
        ],
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
            data.items.push(item);
        }
    }

})();

// UI Controller
const UICtrl = (function(){

    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn'
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

    }

    // Add Item Submit
    const itemAddSubmit = function(e) {
        console.log('Add');
        e.preventDefault();
    };

    return {

        init: function() {

            // Fetch items from data structure
            const items = ItemCtrl.getItems();
            
            // Populate list with items
            UICtrl.populateItemList(items);

        }

    }

})(ItemCtrl, UICtrl);

App.init();