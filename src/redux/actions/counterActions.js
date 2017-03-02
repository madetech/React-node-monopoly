/**
 * Created by avv123avv on 07.02.17.
 * Example of using Redux actions
 */

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

export function incrementCounter() {
    return { type: INCREMENT_COUNTER };
}
