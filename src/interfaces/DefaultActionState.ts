/** This is the base state for all actions to keep track of individual actions state and display to user
 * if multiple actions have been dispatched
 */
interface DefaultActionState {
    isPending: boolean;
    success: boolean;
}
export default DefaultActionState;
