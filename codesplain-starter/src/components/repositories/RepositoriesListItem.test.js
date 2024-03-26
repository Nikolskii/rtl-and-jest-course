import { render, screen, act, within } from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import { MemoryRouter } from 'react-router-dom';

// jest.mock('../tree/FileIcon', () => {
//   // Content of FileIcon.js
//   return () => {
//     return 'File Icon Component'
//   }
// });

function renderComponent() {
  const repository = {
    full_name: 'typescript-cheatsheets/react',
    language: 'TypeScript',
    description:
      'Cheatsheets for experienced React developers getting started with TypeScript',
    name: 'react',
    html_url: 'https://github.com/facebook/react',
    owner: {
      login: 'facebook',
    },
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test('shows a link to the github homepage for this repository', async () => {
  const { repository } = renderComponent();

  // await act(async () => {
  //   await pause();
  // });

  await screen.findByRole('img', { name: repository.language });
  const link = screen.getByRole('link', {
    name: /GitHub repository/i,
  });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', repository.html_url);
  expect(link).toHaveAttribute('target', '_blank');
});

test('shows a fileicon with the appropriate icon', async () => {
  const { repository } = renderComponent();

  const icon = await screen.findByRole('img', {
    name: repository.language,
  });

  expect(icon).toHaveClass('ts-icon');
});

test('shows a link to the code editor page', async () => {
  const { repository } = renderComponent();
  const { language, owner, name, full_name } = repository;

  await screen.findByRole('img', { name: language });
  // const link = screen.getByRole('link', {
  //   name: `${owner.login}/ ${name}`,
  // });
  const link = screen.getByRole('link', {
    name: new RegExp(owner.login),
  });

  expect(link).toHaveAttribute('href', `/repositories/${full_name}`);
});
