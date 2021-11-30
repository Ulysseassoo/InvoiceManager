<?php

namespace App\Command;

use App\Service\UserManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateUserCommand extends Command 
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'manage:create-user';
    protected static $defaultDescription = 'Creates a new user.';
    private UserManager $userManager;

    public function __construct(bool $requirePassword = false, UserManager $userManager)
    {
        // best practices recommend to call the parent constructor first and
        // then set your own properties. That wouldn't work in this case
        // because configure() needs the properties set in this constructor
        $this->requirePassword = $requirePassword;
        $this->userManager = $userManager;

        parent::__construct(null);
    }

    protected function configure(): void
    {
        $this
        // If you don't like using the $defaultDescription static property,
        // you can also define the short description using this method:
        // ->setDescription('...')

        // the command help shown when running the command with the "--help" option
        ->setHelp('This command allows you to create a user...');

        $this
        // configure an argument
        ->addArgument('email', InputArgument::REQUIRED, 'The email of the user.');
        $this
        // ...
        ->addArgument('password', $this->requirePassword ? InputArgument::REQUIRED : InputArgument::OPTIONAL, 'The password of the user');
    }

    
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        // ... put here the code to create the user
        // outputs multiple lines to the console (adding "\n" at the end of each line)
        $output->writeln([
            'User Creator',
            '============',
            '',
        ]);

        $output->writeln('You are about to create a user');
        $output->writeln('Email: '.$input->getArgument('email'));
        $output->writeln('Password: '.$input->getArgument('password'));
        $this->userManager->create($input->getArgument('email'), $input->getArgument('password'));
        $output->writeln('The User has been created');
        // this method must return an integer number with the "exit status code"
        // of the command. You can also use these constants to make code more readable

        // return this if there was no problem running the command
        // (it's equivalent to returning int(0))
        return Command::SUCCESS;

        // or return this if some error happened during the execution
        // (it's equivalent to returning int(1))
        // return Command::FAILURE;

        // or return this to indicate incorrect command usage; e.g. invalid options
        // or missing arguments (it's equivalent to returning int(2))
        // return Command::INVALID
    }
}