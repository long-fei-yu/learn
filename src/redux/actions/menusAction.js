export const MENU_CLICK = 'CLICK';

export const menuClick = (index) => {

    return {
        type: MENU_CLICK,
        index,
    }
};
