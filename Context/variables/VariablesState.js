import React, {useReducer} from 'react';

import VariablesReducer from './VariablesReducer';
import VariableContext from './VariableContext';

const VariablesState = ({children}) => {
    const [state, dispatch] = useReducer(VariablesReducer, {});
    const updateVariables = data => {
        dispatch({
            type: 'UPDATE_VARIABLES',
            payload: data,
        });
    };

    const deleteVariables = (data = {}) => {
        dispatch({
            type: 'DELETE_VARIABLES',
            payload: data,
        });
    };

    return (
        <VariableContext.Provider
            value={{
                variables: state,
                updateVariables,
                deleteVariables,
            }}>
            {children}
        </VariableContext.Provider>
    );
};

export default VariablesState;
