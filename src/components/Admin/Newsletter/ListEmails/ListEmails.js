import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { map, size } from "lodash";
import { Newsletter } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { EmailItem } from "../EmailItem";
import "./ListEmails.scss";

const newsletterController = new Newsletter();

export function ListEmails() {
  const [emails, setEmails] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false); // Nuevo estado
  const { accessToken } = useAuth();

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const response = await newsletterController.getEmails(
          accessToken,
          page,
          20
        );
        setEmails(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.total,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    })();
  }, [page, reload]);

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  if (loading) return <Loader active inline="centered" />;
  if (!emails) return <Loader active inline="centered" />;
  if (size(emails) === 0) return "No hay emails registrados";

  return (
    <div className="list-emails">
      {map(emails, (email) => (
        <EmailItem key={email._id} email={email} onReload={onReload} />
      ))}

      <div className="list-emails__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={false}
          firstItem={false}
          lastItem={false}
          secondary
          pointing
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
