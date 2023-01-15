import React, {Component} from "react"
import Loading from "./Loading.gif"; 
export class Spinner extends Component {
    render() {
        return(
            <div className="text-center">
                <img className = "my-3" src = {Loading} alt = "loading-spinner"></img>
            </div>
        )
    }
}
export default Spinner;