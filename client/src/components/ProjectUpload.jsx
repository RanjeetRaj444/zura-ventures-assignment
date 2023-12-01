import React, { useEffect, useState } from "react";
import ytIcon from "../assets/yt.png";
import spotifyIcon from "../assets/spotify.png";
import feedIcon from "../assets/feed.png";
import { IoMdCloudUpload } from "react-icons/io";
import {
  ButtonGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { get_records } from "../utils/ApiRoutes";
import { add_records } from "../utils/ApiRoutes";
import { delete_records } from "../utils/ApiRoutes";

const uploadCards = [
  { icon: ytIcon, title: " Upload Youtube video" },
  { icon: spotifyIcon, title: " Upload Spotify Podcasts" },
  { icon: feedIcon, title: " Upload from RSS feed" },
];

const ProjectUpload = () => {
  const [episdoeState, setEpisdoeState] = useState({
    name: null,
    description: null,
  });
  const [hasProjectEpisodes, setHasProjectEpisodes] = useState(false);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);

  const {
    isOpen: isCreateEpisodeModalOpen,
    onOpen: onCreateEpisodeModalOpen,
    onClose: onCreateEpisodeModalClose,
  } = useDisclosure();

  const createEpisode = () => {
    onCreateEpisodeModalOpen();
  };

  const makeEpisode = async () => {
    if (!episdoeState.name || !episdoeState.description) {
      return;
    }

    try {
      const { data } = await axios.post(`${add_records}`, {
        name: episdoeState.name,
        description: episdoeState.description,
        date: Date.now(),
        time: new Date().toLocaleTimeString(),
        projectId: projectId,
      });

      if (data) {
        getEpisodes();
        onCreateEpisodeModalClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setEpisdoeState({
      ...episdoeState,
      [event.currentTarget.id]: event.target.value,
    });
  };

  const getEpisodes = async () => {
    try {
      const { data } = await axios.get(`${get_records}/${projectId}`);
      if (data.data.length === 0) {
        setHasProjectEpisodes(false);
        return;
      }

      setHasProjectEpisodes(true);
      setEpisodes(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEpisode = async (index) => {
    try {
      const { data } = await axios.delete(
        `${delete_records}/${episodes[index]._id}`
      );

      console.log(data);
      if (data) {
        getEpisodes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigateEditEpisode = () => {};

  useEffect(() => {
    getEpisodes();
  }, [projectId]);

  return (
    <div className="project__upload">
      <div className="upload__title">Upload</div>
      <div className="upload__cards-container">
        {hasProjectEpisodes ? (
          <div className="has-episode__section">
            <div className="upload__cards">
              {uploadCards.map((card) => (
                <UploadCard
                  key={card.title}
                  cardIcon={card.icon}
                  cardName={card.title}
                  createEpisode={createEpisode}
                />
              ))}
            </div>

            <div className="try__it__out">
              <p>All files are processed! Your widget is ready to go!</p>

              <button>Try it out!</button>
            </div>

            {episodes.length > 0 && (
              <div className="episodes__sections">
                <TableContainer className="episodes__sections-table">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Upload Date & Time</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {episodes.map((episode, index) => (
                        <Tr key={episode?._id}>
                          <Td>{episode?.name}</Td>
                          <Td>
                            {episode.date} | {episode.time}
                          </Td>
                          <Td>{episode.status ? "Done" : "Pending"}</Td>
                          <Td>
                            <ButtonGroup size="sm" isAttached variant="outline">
                              <Button
                                onClick={() =>
                                  navigate(`/${projectId}/transcript`, {
                                    state: episode,
                                  })
                                }
                                className="action__edit"
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => {
                                  deleteEpisode(index);
                                }}
                                style={{ color: "var(--danger-color)" }}
                                className="action__delete"
                              >
                                Delete
                              </Button>
                            </ButtonGroup>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </div>
        ) : (
          <div className="no-episodes__section">
            <div className="upload__cards">
              {uploadCards.map((card) => (
                <UploadCard
                  key={card.title}
                  cardIcon={card.icon}
                  cardName={card.title}
                  createEpisode={createEpisode}
                />
              ))}
              {uploadCards.map((card) => (
                <UploadCard
                  key={card.title}
                  cardIcon={card.icon}
                  cardName={card.title}
                  createEpisode={createEpisode}
                />
              ))}
            </div>

            <div className="or">or</div>

            <div className="episode-selection__area">
              <div className="upload__icon">
                <IoMdCloudUpload />
              </div>

              <div className="upload__info">
                <h2>
                  Select a file to drag or drop here (Post Media or
                  Transcription Text)
                </h2>
                <p>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>
              </div>

              <button>Select File</button>
            </div>
          </div>
        )}
      </div>

      <Modal isCentered isOpen={isCreateEpisodeModalOpen} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="create__episode-title">
              <img src={ytIcon} alt="" />
              <p>Upload from Youtube</p>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="create__episode-modal">
              <p>Name</p>
              <Input
                placeholder="Episode Name"
                id="name"
                onChange={(event) => handleInputChange(event)}
              />
              <p>Dec</p>
              <Textarea
                placeholder="Episode Description"
                id="description"
                onChange={(event) => handleInputChange(event)}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onCreateEpisodeModalClose}
              colorScheme="red"
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              onClick={makeEpisode}
              style={{
                background: "#7e22ce",
                color: "white",
                marginLeft: "10px",
              }}
              variant="ghost"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProjectUpload;

const UploadCard = ({ cardIcon, cardName, createEpisode }) => {
  return (
    <div className="upload__card" onClick={createEpisode}>
      <div className="upload__card-title-icon">
        <img src={cardIcon} alt="" />
      </div>
      <div className="upload__card-title-text">{cardName}</div>
    </div>
  );
};
