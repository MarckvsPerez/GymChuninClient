import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { map, size } from "lodash";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Exercise } from "../../../../api";
import { ExerciseItem } from "../ExerciseItem";
import "./ListExercise.scss";

const exerciseController = new Exercise();

export function ListExercise(props) {
  const { reload, onReload, muscle } = props;

  const [exercises, setExercises] = useState(null);
  const [pagination, setPagination] = useState();
  const [searchParams] = useSearchParams();
  const [activePage, setActivePage] = useState(searchParams.get("page") || 1);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await exerciseController.getExercises(
          activePage,
          1,
          muscle
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
    })();
  }, [activePage, reload, muscle]);

  useEffect(() => {
    setActivePage(1);
  }, [muscle]);

  const changePage = (_, data) => {
    const newPage = data.activePage;
    setActivePage(newPage);
    navigate(`?page=${newPage}`);
  };

  if (!exercises) return <Loader active inline="centered" />;
  if (size(exercises) === 0) return "No hay ningún ejercicio";

  return (
    <div className="list-exercise">
      {map(exercises, (exercise) => (
        <ExerciseItem
          key={exercise._id}
          exercise={exercise}
          onReload={onReload}
        />
      ))}

      <div className="list-post__pagination">
        <Pagination
          totalPages={pagination.pages}
          activePage={activePage}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}