import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { Exercise } from "../../../../api";
import { ExerciseItem } from "../../../Shared/ExerciseItem";
import "./ListExercise.scss";

const exerciseController = new Exercise();

export function ListExercise({ reload, onReload, muscleGroup }) {
  const [exercises, setExercises] = useState(null);
  const [pagination, setPagination] = useState({});
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const response = await exerciseController.getExercises(
          activePage,
          10,
          null,
          muscleGroup
        );
        setExercises(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.total,
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchExercises();
  }, [activePage, reload, muscleGroup]);

  useEffect(() => {
    setActivePage(1);
  }, [muscleGroup]);

  const changePage = (_, data) => {
    setActivePage(data.activePage);
  };

  if (!exercises) return <Loader active inline="centered" />;

  return (
    <div className="list-exercise">
      {exercises?.length ? (
        exercises.map((exercise) => (
          <ExerciseItem
            key={exercise._id}
            exercise={exercise}
            onReload={onReload}
            editable={true}
          />
        ))
      ) : (
        <div>No hay ningún ejercicio</div>
      )}

      <div className="list-post__pagination">
        <Pagination
          totalPages={pagination.pages}
          activePage={activePage}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          secondary
          pointing
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
