export const POLYGON_ERR_MSG = {
    REQUIRED: "The polygon takes a list of points which are the X and Y coordinates of each pair. Mimimum 3 points needed.(eg p 200,10 250,190 160,210 )",
    NON_NUMERIC: "Given point is not a number",
    POINT_MISSING: "X or Y pair is missing on given points"
}

export const RECT_ERR_MSG = {
    REQUIRED: "Rectangle should have <X Coordinate> <Y Coordinate> <Width> <Height>. eg: r 0 0 100 100",
    X: "X Coordinate is missing in Rectangle or the input is not a number",
    Y: "Y Coordinate is missing in Rectangle or the input is not a number",
    WIDTH: "Width is missing in Rectangle or the input is not a number",    
    HEIGHT: "Height is missing in Rectangle or the input is not a number"
}

export const CIRCLE_ERR_MSG = {
    REQUIRED: "Circle should have <CX Coordinate> <CY Coordinate> <Radius>. eg: c 100 100 20",
    CX: "CX Coordinate is missing in Circle or the input is not a number",
    CY: "CY Coordinate is missing in Circle or the input is not a number",
    R: "Radius is missing in Circle or the input is not a number"
}

export const EMPTY_STRING = "";
export const APP_ERROR = "Only supports polygon, circle, rectangle. For Polygon start with \"P\", Circle starts with \"C\", Rectangle starts with \"R\"";