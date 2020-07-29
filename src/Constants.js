import React from 'react';

import StyleOne from "./Photos/boldIcon.svg";
import StyleTwo from "./Photos/cleanIcon.svg";
import StyleThree from "./Photos/everIcon.svg";

export const ApiKey = "AwDUla4uRT3GfDinUA6t9z"

//export const Cookies = new Cookies();

export const PickerOptions = {
        accept: 'image/*',
        maxFiles: 10,
        transformations: {
          crop: {
            aspectRatio: 1/1
          }
        },
        fromSources: ['instagram', 'facebook', 'googledrive']
      }

export const AvailableOptions = 
  [{
    name: 'Edge',
    img: StyleOne
  },
  {
    name: 'Even',
    img: StyleTwo
  },
  {
    name: 'Classic',
    img: StyleThree
  }]
