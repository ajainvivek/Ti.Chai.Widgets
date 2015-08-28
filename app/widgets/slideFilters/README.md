# slideFilters 
slideFilters is a easily configurable sliding filter widget with multi select and single select options. 

It can be used across in various scenarios such as ecommerce, health and other apps with more number of filters on the screen.

Please feel free to contribute.

![image](http://i.imgur.com/ACYYEDs.gif?raw=true)

## Installation

## Data Structure 
```javascript
var data = [{
  title : "Multi Filter",
  type : "checkbox",
  options : [{
    id : 1,
    label : "Red"
  },{
    id : 2,
    label : "Yellow"
  },{
    id : 3,
    label : "Green"
  }]
},{
  title : "Single Filter",
  type : "radio",
  options : [{
    id : 4,
    label : "Black"
  },{
    id : 5,
    label : "Orange"
  },{
    id : 6,
    label : "Purple"
  }], 
}];
```

## Usage
```javascript
window.addEventListener("open", function () { //make sure the widget is instantiated after window open event
  var slideRightFilters = Alloy.createWidget("slideFilters", {
    wrapper : window, //pass the window or wrapper object
    offset : { 
      height : offsetHeight, //offset height
      top : offsetHeight //offset top
    },
    data : data, //checkbox/radio array
    slide : "right", //right/left slide
    applyFilters : function (filters) {
        console.log(filters); // [{id : 1, label : "Red", selected : true}]
    }
  });
});
```
**Properties**
* **wrapper**: container to add slide filter
* **offset**: offset height / top to push container below 
* **data**: filters options data to be passed
* **slide**: slide left/right animate
* **applyFilters**: callback when filter is applied returns array of applied filter values

**Functions**
* **toggle**: toggle slide open/close
* **open**: open the slider
* **close**: close the slider
* **reset**: reset the filters values

##Notes
* Any bugs please raise a ticket