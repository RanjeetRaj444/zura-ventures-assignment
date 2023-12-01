import { Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { update_records } from "../utils/ApiRoutes";

const EditTranscript = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateState, setUpdateState] = useState({
    name: null,
    description: null,
  });
  const { state } = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const handleEditModeChange = () => {
    setIsEditMode(!isEditMode);
  };

  const updateRecord = async () => {
    if (!updateState.name || !updateState.description) {
      return;
    }

    try {
      const { data } = await axios.patch(
        `${update_records}/${state?._id}`,
        updateState
      );

      if (data) {
        navigate(`/${projectId}/upload`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputBoxChange = (event) => {
    setUpdateState({
      ...updateState,
      [event.currentTarget.id]: event.target.value,
    });
  };

  useEffect(() => {
    setUpdateState({ name: state.name, description: state.description });
  }, []);

  return (
    <div className="transcript__container">
      <div className="transcript__container-header">
        <div className="upload__title">
          <h1>Edit Transcript</h1>
        </div>
        {isEditMode && (
          <div className="edit__action-buttons">
            <button
              onClick={() => navigate(`/${projectId}/upload`)}
              className="discard"
            >
              Discard
            </button>
            <button onClick={updateRecord} className="save">
              Save & exit
            </button>
          </div>
        )}
      </div>

      <div className="edit__transcript-box">
        <div className="edit__header">
          <button className="edit__mode" onClick={() => handleEditModeChange()}>
            Edit Mode
          </button>
          <button className="search">S</button>
        </div>

        <div className="editable__conntent">
          {isEditMode ? (
            <Input
              type="text"
              placeholder="Name"
              value={updateState.name}
              id="name"
              style={{ marginBottom: "20px" }}
              onChange={(event) => handleInputBoxChange(event)}
            />
          ) : (
            <h2>{state.name}</h2>
          )}

          {isEditMode ? (
            <Textarea
              placeholder="Desc"
              value={updateState.description}
              onChange={(event) => handleInputBoxChange(event)}
              id="description"
              style={{ height: "50%" }}
            />
          ) : (
            <p>{state.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTranscript;
