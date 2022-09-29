export default function ErrorMessage({ message }) {
    if (!message) return null;
  
    return (
      <div className="alert alert-error mt-1">
        <div>
          
          <label>{message}</label>
          
        </div>
      </div>
    );
  }
  