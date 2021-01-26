import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useImmer, useImmerReducer } from "use-immer";
import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import parse from "html-react-parser";
import { Notyf } from "notyf";
import Editor from "react-medium-editor";

import Header from "../components/header/Header";
import Main from "../components/main/Main";
import Footer from "../components/footer/Footer";

const Index = ({ email }) => {
  const processEmail = () => {
    let parser = new DOMParser(),
      emailDocument = parser.parseFromString(email, "text/html"),
      emailComponents = Array.from(
        emailDocument.querySelectorAll(".backgroundTable")
      ).map((component) => component.outerHTML);
    return emailComponents.map((component) => {
      return {
        id: uuid(),
        markup: component,
      };
    });
  };

  const reducer = (
    draft,
    { type, sourceId, sourceIndex, destinationId, destinationIndex }
  ) => {
    draft[sourceId] = draft[sourceId] || [];
    draft[destinationId] = draft[destinationId] || [];
    switch (type) {
      case "MOVE":
        const [removed] = draft[sourceId].splice(sourceIndex, 1);
        draft[destinationId].splice(destinationIndex, 0, removed);
        return;
      case "COPY":
        draft[destinationId].splice(destinationIndex, 0, {
          id: uuid(),
          markup: data[sourceIndex].markup,
        });
        return;
      case "DELETE":
        draft[sourceId].splice(sourceIndex, 1);
        return;
    }
  };

  const data = processEmail();

  const [state, dispatch] = useImmerReducer(reducer, {
    components: data,
    build: [],
  });

  const onDragEnd = useCallback(({ reason, source, destination }) => {
    if (reason === "DROP") {
      if (!destination) {
        return;
      }
      if (source.droppableId == "build" && destination.droppableId == "build") {
        dispatch({
          type: "MOVE",
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        });
      }
      if (
        source.droppableId == "components" &&
        destination.droppableId == "build"
      ) {
        dispatch({
          type: "COPY",
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        });
      }
      if (
        source.droppableId == "build" &&
        destination.droppableId == "delete"
      ) {
        dispatch({
          type: "DELETE",
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        });
      }
    }
  }, []);

  const notyf = new Notyf({
    duration: 3000,
    position: {
      x: "right",
      y: "bottom",
    },
    types: [
      {
        type: "success",
        background: "#FF00FF",
      },
      {
        type: "error",
        background: "#CC0000",
      },
    ],
  });

  const exportEmail = () => {
    let parser = new DOMParser(),
      emailDocument = parser.parseFromString(email, "text/html");
    if (state.build.length > 0) {
      emailDocument.body.innerHTML = state.build
        .map((component) => component.markup)
        .join("");
      navigator.clipboard.writeText(
        emailDocument.querySelector("html").outerHTML
      );
      notyf.success("Copied to clipboard");
    } else {
      notyf.error("Please add components");
    }
  };

  const editComponent = (provided) => {

    let markup = state.build.find(block => block.id == provided.draggableProps["data-rbd-draggable-id"]).markup;
    
    let parser = new DOMParser(),
    parsedComponent = parser.parseFromString(markup, "text/html");

    Array.from(parsedComponent.body.querySelectorAll('.customFont')).map(editables => console.log(editables.innerHTML));
    
  };

  const [text, setText] = useImmer('');

  return (
    <>
      <Header />
      <Main>
        <section className="mb-10">
          <div className="col-span-1 text-right">
            <a
              className="text-base text-white hover:text-pavilion-purple bg-floss-pink hover:bg-white hover:shadow-full inline-block px-8 py-2 ml-5 cursor-pointer"
              onClick={() => exportEmail()}
            >
              Export
            </a>
          </div>
        </section>
        <DragDropContext onDragEnd={onDragEnd}>
          <section className="grid gap-x-10 grid-cols-2 select-none mb-10">
            <article>
              <Droppable
                droppableId="components"
                type="COMPONENTS"
                isDropDisabled={true}
              >
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {state.components?.map(({ id, markup }, index) => (
                      <Draggable draggableId={id} key={id} index={index}>
                        {(provided, snapshot) => (
                          <>
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              onClick={(e) => {
                                if (e.defaultPrevented) {
                                  return;
                                }
                                e.preventDefault();
                              }}
                            >
                              {parse(markup)}
                            </div>
                            {snapshot.isDragging && (
                              <div className="clone">{parse(markup)}</div>
                            )}
                          </>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </article>
            <article className="col-span-1">
              <div className="border-gray-300 border-4 rounded-lg p-8 mb-5">
                <Droppable droppableId="build" type="COMPONENTS">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{ minHeight: "400px" }}
                    >
                      {state.build.length > 0
                        ? state.build?.map(({ id, markup }, index) => (
                            <Draggable draggableId={id} key={id} index={index}>
                              {(provided) => {
                                return (
                                  <>
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                      onClick={(e) => {
                                        if (e.defaultPrevented) {
                                          return;
                                        }
                                        e.preventDefault();
                                        editComponent(provided);
                                      }}
                                    >
                                      {parse(markup)}
                                    </div>
                                  </>
                                );
                              }}
                            </Draggable>
                          ))
                        : provided.placeholder && (
                            <span className="font-avant-garde-bold text-xl text-gray-300">
                              Drag &amp; Drop Components Here To Build
                            </span>
                          )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              <div className="border-red-100 border-4 rounded-lg p-8 mb-5">
                <Droppable droppableId="delete" type="COMPONENTS">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{ minHeight: "250px" }}
                    >
                      <span className="font-avant-garde-bold text-xl text-red-200">
                        Drag &amp; Drop Here To Delete
                      </span>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </article>
          </section>
        </DragDropContext>
        <section>
          <Editor
            tag="pre"
            text={text}
            onChange={(text) => setText((draft) => (draft = text))}
            options={{ toolbar: { buttons: ["bold", "italic", "underline"] } }}
          />
        </section>
      </Main>
      <Footer />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { query } = context,
    { profile, id } = query,
    url = `https://www.uploadlibrary.com/creativepure360/customer-templates/profiles/${profile}/${id}.html`,
    res = await fetch(url),
    email = await res.text();
  return {
    props: { email },
  };
};

export default Index;
