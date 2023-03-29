import { Button } from "react-bootstrap";
const WideButton:React.FC<{text:string}> = ({text}) =>{
    return (
        <>
                <Button
                    variant="danger"
                    className="w-100 fs-5"
                    type="submit">
                    {text}
                </Button>
        </>
    );
}

export default WideButton