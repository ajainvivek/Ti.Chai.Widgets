# smartChat - Interactive Chat Widget
Smart Chart Interactive Chat widget for Appcelerator Studio. It's still in Beta Version.

It can be used across in various scenarios such as long form filling with conditional flow, interactive feedback and to collect various information via chat mechanism.  

Please feel free to contribute.

It comprises of strict data structure in order to traverse through the flow. Will be shortly updating with video cast explaining the flow.

![image](http://oi57.tinypic.com/24fzkhf.jpg?raw=true)

## Installation

## Data Structure 
JsonEditor: http://jsoneditoronline.org/?id=797fc06b44aa777dd4199c06837bbe66
```javascript
{
  "1": {
    "id": "1",
    "title": "Wnat is your gender?",
    "type": "bubble",
    "options": [
      {
        "id": 1,
        "value": "male"
      },
      {
        "id": 2,
        "value": "female",
        "nextQsId": "6"
      }
    ],
    "nextQsId": "2",
    "help": "Choose valid gender",
    "repeat": 0
  },
  "2": {
    "id": "2",
    "title": "How old are you?",
    "type": "textfield",
    "validate": {
      "type": "numeric",
      "value": {
        "min": 1,
        "max": 100
      },
      "length": {
        "min": 1,
        "max": 3
      },
      "regEx": ""
    },
    "help": "Choose valid gender",
    "nextQsId": "3",
    "repeat": 0
  },
  "3": {
    "id": "3",
    "title": "Graduation year?",
    "type": "picker",
    "validate": {
      "type": "date",
      "range": {
        "min": "",
        "max": ""
      },
      "format": ""
    },
    "nextQsId": "4",
    "repeat": 0
  },
  "4": {
    "id": "4",
    "title": "What are your favourite food?",
    "type": "multi",
    "options": [
      {
        "id": 1,
        "value": "mexican"
      },
      {
        "id": 2,
        "value": "italian"
      },
      {
        "id": 3,
        "value": "indian"
      }
    ],
    "nextQsId": "5",
    "repeat": 0
  },
  "5": {
    "id": "5",
    "title": "Are you married ?",
    "type": "single",
    "options": [
      {
        "id": 1,
        "value": "yes"
      },
      {
        "id": 2,
        "value": "no"
      }
    ],
    "nextQsId": "6",
    "repeat": 0
  },
  "6": {
    "id": "6",
    "title": "You are done",
    "type": "info",
    "repeat": 0
  }
}
```

## Usage
```javascript
var smartChat = Alloy.createWidget("smartChat", {
	data: data, //static conversational template data
	onFinish: callChatEnded, //if nextQsId === undefined then conversation is completed
	initialQs: "1", //Qs property value
	delay : 500 //default 800ms
});
```
**Properties**
* **data**: static conversational template data
* **initialQs**: Set first question property value
* **delay**: delay for each question to appear 

**Functions**
* **onFinish**: on conversational flow is finished trigger callback

##Notes
* Any bugs please raise a ticket