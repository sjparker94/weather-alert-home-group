import React, { useState } from 'react';

/** Simple form handler to cope with text and select fields
 * Initialse with object of form state with initial values
 */
function useForm<T extends {}>(initial: T) {
    const [inputs, setInputs] = useState(initial);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    function resetForm() {
        setInputs(initial);
    }

    function clearForm() {
        const blankState = Object.fromEntries(Object.entries(inputs).map(([key]) => [key, '']));
        // @ts-ignore
        setInputs(blankState);
    }

    return {
        inputs,
        handleChange,
        resetForm,
        clearForm,
    };
}

export default useForm;
