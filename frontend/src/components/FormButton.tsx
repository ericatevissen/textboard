import pencilSvg from "/pencil.svg";

interface FormButtonProps {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormButton( { setShowForm } : FormButtonProps ) {
    return (
        <button className="form-button" onClick={() => setShowForm(true)}>
            <img src={pencilSvg} alt="new post button"/>
        </button>
    );
}