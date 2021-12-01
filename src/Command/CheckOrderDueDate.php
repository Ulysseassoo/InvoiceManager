<?php

namespace App\Command;

use App\Service\OrderManager;
use App\Service\UserManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CheckOrderDueDate extends Command 
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'manage:due-date-order';
    protected static $defaultDescription = 'Check if there are paiements that have passed the due date. Their orders get the late state';
    private OrderManager $orderManager;

    public function __construct(OrderManager $orderManager)
    {
        // best practices recommend to call the parent constructor first and
        // then set your own properties. That wouldn't work in this case
        // because configure() needs the properties set in this constructor
        $this->orderManager = $orderManager;

        parent::__construct(null);
    }

    protected function configure(): void
    {
        $this
        // If you don't like using the $defaultDescription static property,
        // you can also define the short description using this method:
        // ->setDescription('...')

        // the command help shown when running the command with the "--help" option
        ->setHelp('This command checks the due date of the orders and compare them to todays date...');
    }

    
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        // ... put here the code to create the user
        // outputs multiple lines to the console (adding "\n" at the end of each line)
        $output->writeln([
            'Checking Orders',
            '...',
            '....',
            '.....',
        ]);
        $orders = $this->orderManager->CheckOrdersDueDate();
        $length = count($orders);
        $output->writeln("There are {$length} orders that were not paid and over the due date.");
        if ($length > 0) {
            $output->writeln("Their state were changed to late.");
        }
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