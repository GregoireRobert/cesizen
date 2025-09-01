namespace App\Tests\Controller;

use App\Kernel; // <-- important
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class MeControllerTest extends WebTestCase
{
    // Indique explicitement la classe du Kernel
    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }

    public function testSomething(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/me');
        $this->assertResponseIsSuccessful(); // ajuste si /api/me nécessite une auth (voir note)
    }
}
