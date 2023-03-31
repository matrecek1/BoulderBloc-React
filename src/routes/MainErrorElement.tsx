import { useRouteError } from "react-router-dom"
import MainNav from "../components/MainNav"
import Root from "../components/Root"
import { IRouteError } from "../types/error.types"

const ErrorBoundary:React.FC = () =>{
    const error = useRouteError() as IRouteError | null
    console.log(error);
    return (
        <div>
            {error ? (
                <>
                    <div>{error.status}</div>
                    <div>{error.statusText}</div>
                </>
            ) : (
                <div>Something went wrong</div>
            )}
        </div>
    );
}

const MainErrorElement:React.FC = () =>{
    return (<>
    <MainNav header={null} rating={null}/>
    <Root Content={ErrorBoundary}/>
    </>)
}

export default MainErrorElement