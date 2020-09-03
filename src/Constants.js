import React from 'react';

import bold from "./Photos/boldIcon.svg";
import clean from "./Photos/cleanIcon.svg";
import ever from "./Photos/everIcon.svg";
import classic from "./Photos/classicIcon.svg";

export const ApiKey = "AwDUla4uRT3GfDinUA6t9z"

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
    name: 'Bold',
    img: bold
  },
  {
    name: 'Classic',
    img: classic
  },
  {
    name: 'Clean',
    img: clean
  },
  {
    name: 'Even',
    img: ever
  }]
