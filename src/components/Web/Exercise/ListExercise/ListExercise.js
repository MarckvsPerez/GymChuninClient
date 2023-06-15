import React, { useState, useEffect } from "react";
import { Loader, Pagination, Grid } from "semantic-ui-react";
import { map } from "lodash";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Exercise } from "../../../../api";
import { ListExerciseItem } from "../ListExerciseItem";
import "./ListExercise.scss";

const exerciseController = new Exercise();

export function ListExercise() {
  const [exercises, setExercise] = useState(null);
  const [pagination, setPagination] = useState();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const muscleGroup = searchParams.get("muscleGroup");
  const muscle = searchParams.get("muscle");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await exerciseController.getExercises(
          page,
          12,
          muscle,
          muscleGroup
        );
        setExercise(response.docs);
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
  }, [page]);

  const changePage = (_, data) => {
    const newPage = data.activePage;
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  if (!exercises) return <Loader active inline="centered" />;

  return (
    <div className="list-posts-web">
      {exercises.length === 0 ? (
        <div className="list">
          <h3 className="no_content">No hay ejercicios</h3>
        </div>
      ) : (
        <div className="list-grid-container">
          <Grid columns={4} doubling stackable>
            {map(exercises, (exercise) => (
              <Grid.Column key={exercise._id}>
                <ListExerciseItem exercise={exercise} key={exercise._id} />
              </Grid.Column>
            ))}
          </Grid>
        </div>
      )}

      <div className="pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
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
