import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
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
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await exerciseController.getExercises(page, 1);
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
      <div className="list">
        {map(exercises, (exercise) => (
          <div key={exercise._id} className="item">
            <ListExerciseItem exercise={exercise} />
          </div>
        ))}
      </div>

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
