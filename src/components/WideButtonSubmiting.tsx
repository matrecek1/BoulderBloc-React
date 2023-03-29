import { Button } from "react-bootstrap";
import { useNavigation } from "react-router-dom";

const WideButtonSubmiting: React.FC<{text:string}> = ({text}) => {
    return (
        <>
                <Button
                    variant="danger"
                    disabled
                    className="w-100 fs-5"
                    type="submit">
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"></span>
                    {text}
                </Button>
        </>
    );
};

export default WideButtonSubmiting;
