<?php
 
namespace App\Serializer;

use App\Entity\Company;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use App\Service\FileUploader;
 
class CompanyNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;
 
    private FileUploader $fileUploader;
    private const ALREADY_CALLED = 'COMPANY_OBJECT_NORMALIZER_ALREADY_CALLED';
 
    public function __construct(FileUploader $fileUploader) {
        $this->fileUploader = $fileUploader;
    }
 
    public function supportsNormalization($data, ?string $format = null, array $context = []): bool {
        return !isset($context[self::ALREADY_CALLED]) && $data instanceof Company;
    }
 
    public function normalize($object, ?string $format = null, array $context = []) {
        $context[self::ALREADY_CALLED] = true;
 
        // update the logo name with url
        $object->setLogo($this->fileUploader->getUrl($object->getLogo()));
 
        return $this->normalizer->normalize($object, $format, $context);
    }
}