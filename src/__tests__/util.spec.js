import {
  CIRCLE_ERR_MSG,
  EMPTY_STRING,
  POLYGON_ERR_MSG,
  RECT_ERR_MSG,
} from '../constant';
import {
  circleCoordinates,
  getFirsChar,
  hasCircleCoordinates,
  hasPolygon,
  isRect,
  isValidNumber,
  rectangleCoordinates,
} from '../util';

describe('Util', () => {
    describe('Circle functions', () => {
        test('circleCoordinates should return expected result if circle cordinates present', () => {
            expect(circleCoordinates(["100", "100", "20"])).toEqual({cx: "100", cy: "100", r: "20"});
        });
        test('circleCoordinates should return null if any circle cordinates missing', () => {
            expect(circleCoordinates(["100", "100"])).toBe(null);
        });        

        test('hasCircleCoordinates should return Empty Error Message if given inputs has all required coordinates', () => {
            expect(hasCircleCoordinates(["100", "100", "20"])).toEqual(EMPTY_STRING);
        });

        test('hasCircleCoordinates should return Expected Error if empty coordinates', () => {
            expect(hasCircleCoordinates([])).toEqual(CIRCLE_ERR_MSG.REQUIRED);
        });

        test('hasCircleCoordinates should return Radius error Message if given inputs has Missing radius coordinates', () => {
            expect(hasCircleCoordinates(["100", "100"])).toEqual(CIRCLE_ERR_MSG.R);
        });

        test('hasCircleCoordinates should return CY error Message if given inputs has Missing radius coordinates', () => {
            expect(hasCircleCoordinates(["100"])).toEqual(CIRCLE_ERR_MSG.CY);
        });
    });
    describe('Rectangle functions', () => {
        test('rectangleCoordinates should return expected result if rectangleCoordinates cordinates present', () => {
            expect(rectangleCoordinates(["0", "0", "100", "100"])).toEqual({x: "0", y: "0", w: "100", h: "100"});
        });
        test('rectangleCoordinates should return null if any rect cordinates missing', () => {
            expect(rectangleCoordinates(["0", "0", "100"])).toBe(null);
        });

        test('isRect should return Empty Error Message if all four cordinates present', () => {
            expect(isRect(["0", "0", "100", "100"])).toBe(EMPTY_STRING);
        });

        test('isRect should return Height Error Message if any of the given points is not a number', () => {
            expect(isRect(["0", "0", "100", "100erer"])).toBe(RECT_ERR_MSG.HEIGHT);
        });

        test('isRect should return Heigth Error Message if height is missing', () => {
            expect(isRect(["0", "0", "100"])).toBe(RECT_ERR_MSG.HEIGHT);
        });

        test('isRect should return Width Error Message if width is missing', () => {
            expect(isRect(["0", "0"])).toBe(RECT_ERR_MSG.WIDTH);
        });

        test('isRect should return Required Error Message if x cordinate is missing', () => {
            expect(isRect([])).toBe(RECT_ERR_MSG.REQUIRED);
        });
    });
    describe('Polygon functions', () => {    
        test('hasPolygon should return Empty Error Message and Valid true if if has three cordinates present', () => {
            expect(hasPolygon(["200,10", "250,190", "160,210"])).toEqual({error: "", isValid: true});
        });
        test('hasPolygon should return Required Error Message', () => {
            expect(hasPolygon([""])).toEqual({error: POLYGON_ERR_MSG.REQUIRED, isValid: false});
        });
        test('hasPolygon should return Required Error Message', () => {
            expect(hasPolygon(["200,10", "250,190"])).toEqual({error: POLYGON_ERR_MSG.REQUIRED, isValid: false});
        });
        test('hasPolygon should return Missing point Error Message', () => {
            expect(hasPolygon(["100"])).toEqual({error: POLYGON_ERR_MSG.POINT_MISSING, isValid: false});
        });
        test('hasPolygon should return Non Numeric point Error Message', () => {
            expect(hasPolygon(["100, 2fddfd"])).toEqual({error: POLYGON_ERR_MSG.NON_NUMERIC, isValid: false});
        });
    });
    describe('isValidNumber', () => {
        test('should return false if the given input is not a number', () => {
            expect(isValidNumber('p100')).toBeFalsy();
        });
        test('should return true if the given input is not a number', () => {
            expect(isValidNumber('100')).toBeTruthy();
        });
    });
    describe('getFirsChar', () => {
        test('should return first Char of the given input', () => {
            expect(getFirsChar('p 100')).toBe('p');
        });
    });
});