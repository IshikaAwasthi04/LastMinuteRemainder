import "./GenerateButton.css";

function GenerateButton({ loading }) {

  return (

    <button
      type="submit"
      className="generate-button"
      disabled={loading}
    >

      {loading ? (

        <>
          <span className="spinner"></span>
          Creating Schedule...
        </>

      ) : (

        <>
          ✨ Generate AI Schedule
        </>

      )}

    </button>

  );

}

export default GenerateButton;