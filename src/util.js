import {
  CIRCLE_ERR_MSG,
  EMPTY_STRING,
  POLYGON_ERR_MSG,
  RECT_ERR_MSG,
} from './constant';

export const isValidNumber = numberString => {
    return /^\d+$/.test(numberString);
}

export const getFirsChar = string => {
    return string.charAt(0).trim().toLowerCase();
}

export const isRect = (coordinates) => {
    let error = EMPTY_STRING;
    if(coordinates <= 0) {
      error = RECT_ERR_MSG.REQUIRED;
    } else {
        const x = coordinates[0];
        const y = coordinates[1];
        const w = coordinates[2];
        const h = coordinates[3];

        if(!isValidNumber(x)) {
            error = RECT_ERR_MSG.X;
        } else if(!isValidNumber(y)) {
            error = RECT_ERR_MSG.Y;
        } else if(!isValidNumber(w)) {
            error = RECT_ERR_MSG.WIDTH;
        } else if(!isValidNumber(h)) {
            error = RECT_ERR_MSG.HEIGHT
        }
    }  

    return error;
}

export const hasCircleCoordinates = (coordinates) => {
    let error = EMPTY_STRING;
    if(coordinates <= 0) {
      error = CIRCLE_ERR_MSG.REQUIRED;
    } else {
        const cx = coordinates[0];
        const cy = coordinates[1];
        const r = coordinates[2];

        if(!isValidNumber(cx)) {
            error = CIRCLE_ERR_MSG.CX; 
        } else if(!isValidNumber(cy)) {
            error = CIRCLE_ERR_MSG.CY;
        } else if(!isValidNumber(r)) {
            error = CIRCLE_ERR_MSG.R;
        }
    }    
    return error;
}

export const circleCoordinates = (coordinates) => {
    const cx = coordinates[0];
    const cy = coordinates[1];
    const r = coordinates[2];
    if(cx && cy && r) {
      return {
        cx: cx,
        cy: cy,
        r: r
      }
    }
    return null;
}

export const rectangleCoordinates = (coordinates) => {
    const x = coordinates[0];
    const y = coordinates[1];
    const w = coordinates[2];
    const h = coordinates[3];
    if(x && y && w && h) {
      return {
        x: x,
        y: y,
        w: w,
        h: h
      }
    }
    return null;
}

export const hasPolygon = (points) => {
    let isValid = false;
    let error = EMPTY_STRING;
    isValid = points.every(input => {
      if(input !== "") {
        if(input.indexOf(',') > -1) {
          const split_input = input.split(",");
          let isValidInput = false;
          if(split_input.length === 2) {
            split_input.forEach(point => {
              if(!isValidNumber(point)) {
                error = POLYGON_ERR_MSG.NON_NUMERIC;
                isValidInput = false;
              } else if(points.length < 3){
                error = POLYGON_ERR_MSG.REQUIRED;
                isValidInput = false;
              } else {
                error = EMPTY_STRING;
                isValidInput = true;
              }
            });
            return isValidInput;
          }           
        } else {
          error = POLYGON_ERR_MSG.POINT_MISSING;
          return false;
        }
      } else {
        error = POLYGON_ERR_MSG.REQUIRED;
        return false;
      }
    });
    return {
        isValid: isValid,
        error: error
    };
}
