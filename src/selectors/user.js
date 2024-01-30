import rootSelector from './root';
import {createSelector } from 'reselect'

export const userSelector = createSelector(rootSelector, root =>{
    return root.user
})